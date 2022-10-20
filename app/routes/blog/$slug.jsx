import React from 'react';
import { useLoaderData } from '@remix-run/react';

// EXT LIBS
import ReactMarkdown from 'react-markdown';

// DATA
import { posts } from '~/assets/markdown/posts';
import { json } from '@remix-run/node';
import { LoadingSpinner } from '~/components/LoadingSpinner';

export async function loader({ params, request }) {
	const postsSorted = posts.sort((a, b) => a.time_posted - b.time_posted);
	const post = postsSorted.find((post) => post.slug === params.slug);
	const post_previous = postsSorted.find((_, index) => index === postsSorted.indexOf(post) - 1);
	const post_next = postsSorted.find((_, index) => index === postsSorted.indexOf(post) + 1);

	return json({
		canonical: request.url,
		post,
		post_previous,
		post_next,
	});
}

export function dynamicLinks({ data }) {
	return [{ rel: 'canonical', href: data.canonical }];
}

export const handle = {
	animatePresence: true,
	dynamicLinks,
	ref: React.createRef(),
};

export default function Post() {
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
