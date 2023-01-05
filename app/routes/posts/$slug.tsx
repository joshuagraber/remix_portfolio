// GLOBALS
import { json, redirect } from '@remix-run/node';
import React from 'react';
import { Link, useLoaderData, useLocation, useTransition } from '@remix-run/react';
import styles from 'styles/post.css';

// COMPONENTS
import { ContainerCenter } from 'components/ContainerCenter';
import { Home } from 'components/SVG/Home';
import { Footer, links as footerLinks } from 'components/Footer';
import { LoadingSpinner, links as loadingSpinnerLinks } from 'components/Spinner';
import { ThemeToggle, links as themeToggleLinks } from 'components/ThemeToggle';
import ReactMarkdown from 'react-markdown';
import YouTube from 'react-youtube';

// SERVICES
import * as blog from 'services/blog.server';
import * as users from 'services/users.server';

// UTIL
import { createETag, stripParamsAndHash } from 'utils/utils.server';

// TYPES
import type { DynamicLinksFunction } from 'remix-utils';
import type { Handle } from 'types/types';
import type { LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import type { Post, User } from '@prisma/client';
import { useEffectDidUpdate } from 'hooks/useEffectDidUpdate';
import { getDocument } from 'ssr-window';
interface YouTubeEmbedProps {
	videoId?: string;
}

interface ImageComponentProps {
	alt?: string;
	src?: string;
	title?: string;
}

// EXPORTS
export const loader: LoaderFunction = async ({ params, request }) => {
	const { slug } = params;

	const post = await blog.getPostBySlug(String(slug));

	if (!post) {
		return redirect('/posts/not-found');
	}

	// Get post author
	const postAuthor = (await users.getUserByID(String(post?.author_id))) as User;
	const authorName = `${postAuthor?.name_first} ${postAuthor?.name_middle} ${postAuthor?.name_last}`;

	// Data to return to client
	const data = {
		authorName,
		canonical: stripParamsAndHash(request.url),
		post,
	};

	// Cacheing
	const responseEtag = createETag(String(data));
	const requestEtag = request.headers.get('If-None-Match');

	// If our etag equals browser's, return 304, browser should fall back to cache
	if (responseEtag === requestEtag) {
		return json(null, { status: 304 });
	} else {
		return json(data, {
			headers: {
				'Cache-Control': 'max-age=10',
				etag: responseEtag,
			},
			status: 200,
		});
	}
};

export const links: LinksFunction = () => {
	return [
		/* Not returning ContainerCenter links here, it is still on the route from being used in /posts,
		 * and importing both places causes warnings on prefetch. */
		...footerLinks(),
		...loadingSpinnerLinks(),
		...themeToggleLinks(),
		{ rel: 'stylesheet', href: styles },
	];
};

export const dynamicLinks: DynamicLinksFunction = ({ data }) => {
	if (data?.canonical) {
		return [{ rel: 'canonical', href: data.canonical }];
	}
	return [];
};

export const meta: MetaFunction = ({ data, params }) => {
	if (!data) {
		return {
			description: `There is no post at the location: /${params.slug}`,
			title: 'Missing post',
		};
	}

	return {
		description: data?.post?.tagline,
		title: `${data?.post?.title}, by: ${data?.authorName}`,
	};
};

export const handle: Handle = {
	animatePresence: true,
	dynamicLinks,
	ref: React.createRef(),
};

// SUB-COMPONENT
const PostFigure: React.FC<ImageComponentProps> = ({ alt, title, src }) => {
	title = title ?? alt;

	if (typeof src === 'undefined') return null;
	if (typeof alt === 'undefined') {
		throw new Error('No images without alt tags!');
	}

	return (
		<figure className='jdg-post-figure'>
			<img className='jdg-post-figure-image' src={src} alt={alt} />
			<figcaption className='jdg-post-figure-caption'>{title}</figcaption>
		</figure>
	);
};

// TODO: use react-youtube (https://www.npmjs.com/package/react-youtube) or similar pkg that interacts with YT API directly
const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ videoId }) => {
	// HOOKS - GLOBAL
	const document = getDocument();

	// HOOKS - REF
	const query = `iframe[src*=${videoId}]`;
	const iFrameRef = React.useRef<HTMLDivElement | null>(document.querySelector(query));

	// HOOKS - STATE
	// Dims to dynamically resize, since YT iFrame is butthole
	const [dimensions, setDimensions] = React.useState<Record<string, number | string>>({
		height: '100%',
		width: '100%',
	});

	// CONSTANTS
	const opts = {
		playerVars: {
			// https://developers.google.com/youtube/player_parameters
			allowpresentation: true,
			modestbranding: true,
			sandbox: 'allow-scripts allow-same-origin allow-presentation',
		},
	};

	useEffectDidUpdate(() => {
		if (iFrameRef.current) {
			const { clientHeight, clientWidth } = iFrameRef.current;
			setDimensions({ height: clientHeight, width: clientWidth });

			window.addEventListener('resize', handleResize);

			return () => window.removeEventListener('resize', handleResize);
		}

		function handleResize() {
			setDimensions({
				height: iFrameRef?.current?.clientHeight ?? 0,
				width: iFrameRef?.current?.clientWidth ?? 0,
			});
		}
	}, [iFrameRef]);

	return (
		<YouTube
			videoId={videoId}
			opts={{ ...opts, ...dimensions }}
			// Forcing aspect ratio via CSS,
			// first render will set it, then
			// dims will get accurate val.
			// A bit hacky, but 🤷🏻‍♂️
			style={{ ...dimensions, aspectRatio: '16/9' }}
		/>
	);
};

const ImageComponent: React.FC<ImageComponentProps> = (props) => {
	switch (true) {
		case props.title === 'youtube':
			return <YouTubeEmbed videoId={props.src} />;
		default:
			return <PostFigure {...props} />;
	}
};

export default function Post(): React.ReactElement {
	const data = useLoaderData();
	const location = useLocation();
	const transition = useTransition();

	// VARS
	const {
		authorName,
		post: { content, image_featured, image_featured_alt, published_at, tags, tagline, title },
	} = data;

	const authorToDisplay = authorName !== 'Joshua D. Graber' ? `Guest writer: ${authorName}` : null;
	const dateToDisplay = new Date(published_at).toLocaleDateString();
	const titleNormalizedForMarkdown = title.includes('#') ? title : `# ${title}`;

	return (
		<div className='jdg-page jdg-page-post'>
			{(transition.state === 'loading' || typeof data === 'undefined') && (
				<LoadingSpinner size='80px' />
			)}
			{/* Header */}
			<header className='jdg-post-header'>
				<ContainerCenter className='jdg-container-center-post-header'>
					<div className='jdg-post-header-image'>
						<img
							src={image_featured}
							alt={
								image_featured_alt ??
								`Hero image for ${title}: ${tagline}, with tags: ${tags.join(', ')}`
							}
						/>
					</div>
					<div className='jdg-post-header-text'>
						<div className='jdg-post-header-text-heading-container'>
							<div className='jdg-post-header-text-heading'>
								<ReactMarkdown children={titleNormalizedForMarkdown} />
							</div>
							<div className='jdg-post-header-text-icons-container'>
								<Link to='/'>
									<div className='jdg-post-header-text-icon-container-home'>
										<Home />
									</div>
								</Link>
								<ThemeToggle />
							</div>
						</div>
						<p className='jdg-post-header-text-sub-heading'>
							<ReactMarkdown children={tagline} />
						</p>

						<div className='jdg-post-header-text-info'>
							{authorToDisplay && <p className='jdg-post-header-text-author'>{authorToDisplay}</p>}
							<p className='jdg-post-header-text-date'>{dateToDisplay}</p>
						</div>
					</div>
				</ContainerCenter>
			</header>

			{/* Main */}
			<main className='jdg-main'>
				<ContainerCenter className='jdg-container-center-post-main'>
					<ReactMarkdown
						children={content}
						components={{
							img: (props) => <ImageComponent {...props} />,
							h1: 'h2',
							// ReactMarkdown wraps everything in p - explicit check for any elements that should
							// be wrapped in p and keep those as p (element children that are not em / strong tags)
							// Wrap everything else in a div.
							p: ({ node, ...props }) => {
								if (
									node.children.some(
										(el) => el.type === 'element' && el.tagName !== 'em' && el.tagName !== 'strong'
									)
								) {
									return <div {...props} />;
								}
								return <p {...props} />;
							},
						}}
					/>
				</ContainerCenter>
			</main>

			<Footer path={location.pathname + location.search} />
		</div>
	);
}

export { CatchBoundary, ErrorBoundary } from 'components/Boundaries';
