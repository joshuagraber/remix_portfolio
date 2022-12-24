// GLOBALS
import { json, redirect } from '@remix-run/node';
import React from 'react';
import { useLoaderData, useLocation, useTransition } from '@remix-run/react';
import styles from 'styles/post.css';

// COMPONENTS
import { ContainerCenter, links as containerCenterLinks } from 'components/ContainerCenter';
import { Footer, links as footerLinks } from 'components/Footer';
import { LoadingSpinner, links as loadingSpinnerLinks } from 'components/Spinner';
import ReactMarkdown from 'react-markdown';

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

// CONSTANTS
const VIDEO_ASPECT_RATIO = {
	height: 6,
	width: 9,
};

interface YouTubeEmbedProps {
	src?: string;
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
		/* Not returning containerCenter here, it is still on the route from being used in /posts,
		 * and importing both places causes warnings on prefetch. */
		...footerLinks(),
		...loadingSpinnerLinks(),
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
const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ src }) => {
	const containerRef = React.useRef<HTMLDivElement>(null);
	// TODO IF REPEATED: Create useElementDimensions hook that receives ref and returns useful DOM dimension / positioning props
	const [dimensions, setDimensions] = React.useState({ clientHeight: 0, clientWidth: 0 });

	React.useEffect(() => {
		if (containerRef.current) {
			const { clientHeight, clientWidth } = containerRef.current;
			setDimensions({ clientHeight, clientWidth });

			window.addEventListener('resize', handleResize);

			return () => window.removeEventListener('resize', handleResize);
		}

		function handleResize() {
			setDimensions({
				clientHeight: containerRef.current?.clientHeight ?? 0,
				clientWidth: containerRef.current?.clientWidth ?? 0,
			});
		}
	}, [containerRef]);

	return (
		<div className='jdg-post-youtube-embed' ref={containerRef}>
			<iframe
				allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
				allowFullScreen
				className='jdg-post-youtube-embed-frame'
				src={src}
				title='YouTube video player'
				height={dimensions.clientWidth / (VIDEO_ASPECT_RATIO.width / VIDEO_ASPECT_RATIO.height)}
				width={dimensions.clientWidth}
			></iframe>
		</div>
	);
};

const ImageComponent: React.FC<ImageComponentProps> = (props) => {
	switch (true) {
		case props.title === 'youtube':
			return <YouTubeEmbed src={props.src} />;
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
		post: { content, image_featured, published_at, tags, tagline, title },
	} = data;

	const authorToDisplay = authorName !== 'Joshua D. Graber' ? `Guest writer: ${authorName}` : null;
	const dateToDisplay = new Date(published_at).toLocaleDateString();

	return (
		<div className='jdg-page jdg-page-post'>
			{(transition.state === 'loading' || typeof data === 'undefined') && (
				<LoadingSpinner size='80px' />
			)}
			{/* Header */}
			<header className='jdg-post-header'>
				<ContainerCenter className='jdg-container-center-post-header'>
					<div className='jdg-post-header-image'>
						{/* TODO: bad alt text.  */}
						<img
							src={image_featured}
							alt={`Hero image for ${title}: ${tagline}, with tags: ${tags.join(', ')}`}
						/>
					</div>
					<div className='jdg-post-header-text'>
						<h1 className='jdg-post-header-text-heading'>{title}</h1>
						<p className='jdg-post-header-text-sub-heading'>{tagline}</p>

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
							p: (props) => {
								if (props.node.children.some((el) => el.type === 'element')) {
									return <div {...props}></div>;
								}
								return <p {...props}></p>;
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
