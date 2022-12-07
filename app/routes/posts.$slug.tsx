// GLOBALS
import { json } from '@remix-run/node';
import React from 'react';
import { useLoaderData } from '@remix-run/react';

// COMPONENTS
import { LoadingSpinner } from 'components/Spinner';
import ReactMarkdown from 'react-markdown';

// SERVICES
import * as blog from 'services/blog.server';
import * as users from 'services/users.server';

// UTIL
import { stripParamsAndHash } from 'utils/utils.server';

// TYPES
import type { DynamicLinksFunction } from 'remix-utils';
import type { Handle } from 'types/types';
import type { LoaderFunction } from '@remix-run/node';
import type { Post } from '@prisma/client';

// EXPORTS
export const loader: LoaderFunction = async ({ params, request }) => {
	const posts = await blog.getPostsAll();

	// Type predicate - is posts array
	if (!Array.isArray(posts)) {
		return json('Posts not found', { status: 404 });
	}

	// Sort posts
	const postsSortedByDate = posts
		.filter((post) => new Date(post.published_at).getTime() <= new Date().getTime())
		.sort((a, b) => new Date(a.published_at).getTime() - new Date(b.published_at).getTime());

	//  Post req from params
	const post = posts.find((post) => post.slug === params.slug);

	// Type predicate - if slug doesn't match psot
	if (typeof post === 'undefined') {
		throw json({ error: 'That post does not exist' }, { status: 404 });
	}

	// Get post author
	const author = await users.getUserByID(post.author_id);

	return json({
		author,
		canonical: stripParamsAndHash(request.url),
		postsSortedByDate,
		post,
	});
};

// TODO meta, etc.
export const dynamicLinks: DynamicLinksFunction = ({ data }) => {
	return [{ rel: 'canonical', href: data.canonical }];
};

export const handle: Handle = {
	animatePresence: true,
	dynamicLinks,
	ref: React.createRef(),
};

export default function Post(): React.ReactElement {
	const data = useLoaderData();

	// TODO: handle this more elegantly
	if (typeof data === 'undefined') {
		return <LoadingSpinner isDisplayed size='80px' />;
	}

	const {
		author,
		post: { content, image_featured, published_at, tagline, title },
		postsSortedByDate,
	} = data;

	return <ReactMarkdown children={content}></ReactMarkdown>;
}

export { ErrorBoundary } from 'components/ErrorBoundary';
