import { resolveMarkdownFileToString } from 'utils/utils.server';

// Import all post content by passing slug to resolveMarkdownFileToString util
// and naming all md files after their post slugs
// Doing this for testing purposes until DB connected, etc.
const blog_test = resolveMarkdownFileToString('blog-test');

// TYPES
import { Posts } from 'types/types.server';

export const posts: Posts = [
	{
		_id: '14KL84361', // Will eventually be Mongo ObjectID
		author: { name_first: 'Joshua', name_middle: 'D.', name_last: 'Graber' },
		comments: [],
		content: blog_test,
		slug: 'blog-test-2',
		tagline: 'Lorem ipsum blah blah second post',
		time_posted: '2022-10-21T14:30:00-5:00',
		title: 'Test Post 2',
	},
	{
		_id: '93AF84675',
		author: { name_first: 'Joshua', name_middle: 'D.', name_last: 'Graber' },
		comments: [],
		content: blog_test,
		slug: 'blog-test',
		tagline: 'Lorem ipsum blah blah test post',
		time_posted: '2022-10-22T11:30:00-5:00',
		title: 'Test Post',
	},
	{
		_id: '93KS90147',
		author: { name_first: 'Joshua', name_middle: 'D.', name_last: 'Graber' },
		comments: [],
		content: blog_test,
		slug: 'blog-test-3',
		tagline: 'Lorem ipsum blah blah blah third post',
		time_posted: '2022-10-30T08:30:00-5:00',
		title: 'Test Post 3',
	},
];
