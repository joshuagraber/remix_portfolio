// GLOBALS
import { json, redirect } from '@remix-run/node';
import React from 'react';
import {
	Form,
	Link,
	useFetcher,
	useLoaderData,
	useLocation,
	useTransition,
} from '@remix-run/react';
import styles from 'styles/post.css';

// COMPONENTS
import { Accordion, links as accordionLinks } from 'components/Accordion';
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
import { Input, links as inputLinks } from 'components/Input';
import { Button, links as buttonLinks } from 'components/Button';
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
	const responseEtag = createETag(JSON.stringify(data));
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
		...accordionLinks(),
		...buttonLinks(),
		/* Not returning ContainerCenter links here, it is still on the route from being used in /posts,
		 * and importing both places causes warnings on prefetch. */
		...footerLinks(),
		...inputLinks(),
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
	const subscribe = useFetcher();

	const bool = true;

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
						<div className='jdg-post-header-text-sub-heading'>
							<ReactMarkdown children={tagline} />
						</div>

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
							a: ({ node, ...props }) => <a rel='noreferrer' target='_blank' {...props} />,
							img: (props) => <ImageComponent {...props} />,
							h1: 'h2',
							// ReactMarkdown wraps everything in p - explicit check for any elements that should
							// be wrapped in p and keep those as p (string children or em / strong elements)
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

					<hr className='jdg-post-break' />

					{/*  TODO: abstract to separate component */}
					<div className='jdg-post-email-list-signup'>
						<Accordion heading='Sign up for my newsletter' name='mailing'>
							<subscribe.Form action='/action/subscribe' method='post'>
								{subscribe.type === 'done' && !subscribe.data && (
									<div className='jdg-post-email-list-signup-confirmation'>
										<h4>You've successfully signed up!</h4>
										<p>Look out for an email confirmation in your inbox shortly.</p>
										{/* TODO: Set up magic link to confirm signups. */}
									</div>
								)}
								{(subscribe.type !== 'done' || subscribe.data) && (
									<>
										<h5>Get updates on new posts and exclusive content, once a month or less.</h5>
										<Input
											defaultValue={subscribe.data?.fields?.email}
											error={subscribe.data?.errors?.email}
											label='Email'
											name='email'
											type='text'
										/>

										<Input
											defaultValue={subscribe.data?.fields?.name_first}
											error={subscribe.data?.errors?.name_first}
											label='First Name'
											name='name_first'
											type='text'
										/>

										<Input
											defaultValue={subscribe.data?.fields?.name_middle}
											error={subscribe.data?.errors?.name_middle}
											label='Middle name or initial (optional)'
											name='name_middle'
											type='text'
										/>

										<Input
											defaultValue={subscribe.data?.fields?.name_last}
											error={subscribe.data?.errors?.name_last}
											label='Last Name'
											name='name_last'
											type='text'
										/>

										<Button
											isLoading={subscribe.state === 'submitting' || subscribe.state === 'loading'}
											type='submit'
										>
											Sign up now
										</Button>
									</>
								)}
							</subscribe.Form>
						</Accordion>
					</div>
				</ContainerCenter>
			</main>

			<Footer path={location.pathname + location.search} />
		</div>
	);
}

export { CatchBoundary, ErrorBoundary } from 'components/Boundaries';
