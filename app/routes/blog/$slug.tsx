// GLOBALS
import { json } from '@remix-run/node';
import React from 'react';
import { useLoaderData } from '@remix-run/react';

// COMPONENTS
import { LoadingSpinner } from 'components/LoadingSpinner';

// EXT LIBS
import ReactMarkdown from 'react-markdown';

// DATA
import { posts } from 'assets/markdown/posts';

// TYPES
import type { DynamicLinksFunction } from 'remix-utils';
import type { Handle } from 'types/types.client';
import type { LoaderFunction } from '@remix-run/node';

// EXPORTS
export const loader: LoaderFunction = ({ params, request }) => {
	const postsSorted = posts.sort(
		(a, b) => new Date(a.time_posted).getTime() - new Date(b.time_posted).getTime()
	);
	const post = postsSorted.find((post) => post.slug === params.slug);

	if (typeof post === 'undefined') {
		throw json({ error: 'That post does not exist' }, { status: 404 });
	}

	const post_previous = postsSorted.find((_, index) => index === postsSorted.indexOf(post) - 1);
	const post_next = postsSorted.find((_, index) => index === postsSorted.indexOf(post) + 1);

	return json({
		canonical: request.url,
		post,
		post_previous,
		post_next,
	});
};

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

	console.log({ data });

	// TODO: handle this more elegantly
	if (typeof data === 'undefined') {
		return <LoadingSpinner isDisplayed />;
	}

	const {
		// Do this destructuring in the server instead
		post: { author, content, time_posted },
		post_previous: { slug: previousSlug, tagline: previousTagline, title: previousTitle },
		post_next: { slug: nextSlug, tagline: nextTagline, title: nextTitle },
	} = data;

	console.log({
		author,
		content,
		time_posted,
		previousSlug,
		previousTitle,
		previousTagline,
		nextSlug,
		nextTitle,
		nextTagline,
	});
	return <ReactMarkdown children={content}></ReactMarkdown>;
}
