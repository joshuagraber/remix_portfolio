import { resolveMarkdownFileToString } from '~/utils/utils';

// Import all post content by passing slug to resolveMarkdownFileToString util
// and naming all md files after their post slugs
const blog_test = resolveMarkdownFileToString('blog-test');

export const posts = [
	{
		author: 'Joshua D. Graber',
		content: blog_test,
		id: '14KL84361',
		slug: 'blog-test-2',
		tagline: 'Lorem ipsum blah blah blah',
		time_posted: '2022-10-21T14:30:00-5:00',
		title: 'Test Post 2',
	},
	{
		author: 'Joshua D. Graber',
		content: blog_test,
		id: '93AF84675',
		slug: 'blog-test',
		tagline: 'Lorem ipsum blah blah blah',
		time_posted: '2022-10-22T11:30:00-5:00',
		title: 'Test Post',
	},
	{
		author: 'Joshua D. Graber',
		content: blog_test,
		id: '93KS90147',
		slug: 'blog-test-3',
		tagline: 'Lorem ipsum blah blah blah',
		time_posted: '2022-10-30T08:30:00-5:00',
		title: 'Test Post 3',
	},
];
