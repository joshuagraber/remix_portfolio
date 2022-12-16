// GLOBALS
import { json } from '@remix-run/node';

// DB
import { prisma } from 'services/prisma.server';

// TYPES
import type { BlogFormValues, BookmarkFormValues } from 'types/types.server';

/////////////////// API
// CREATE
// CREATE - bookmark
export const createNewBookmark = async (formValues: BookmarkFormValues) => {
	try {
		const newBookmark = await prisma.bookmark.create({
			data: formValues,
		});

		return newBookmark;
	} catch (error) {
		throw json(error);
	}
};

// CREATE - post
export const createNewPost = async (formValues: BlogFormValues) => {
	try {
		const { published_at, ...rest } = formValues;
		const published_date = new Date(published_at);

		const newBlogPost = await prisma.post.create({
			data: { published_at: published_date, ...rest },
		});

		return newBlogPost;
	} catch (error) {
		throw json(error);
	}
};

// READ
// READ - bookmarks
export const getBookmarksAll = async () => {
	try {
		return await prisma.bookmark.findMany();
	} catch (error) {
		throw json(error);
	}
};

// READ - posts
export const getPostsAll = async () => {
	try {
		return await prisma.post.findMany();
	} catch (error) {
		throw json(error);
	}
};

export const getPostByID = async (id: string) => {
	try {
		return await prisma.post.findUnique({ where: { id } });
	} catch (error) {
		throw json(error);
	}
};

export const getPostBySlug = async (slug: string) => {
	try {
		return await prisma.post.findUnique({ where: { slug } });
	} catch (error) {
		throw json(error);
	}
};

// UPDATE
// UPDATE - bookmarks
export const updateBookmarkByID = async (id: string, formValues: Partial<BlogFormValues>) => {
	try {
		const updatedPost = await prisma.bookmark.update({
			where: { id },
			data: formValues,
		});
		return updatedPost;
	} catch (error) {
		throw json(error);
	}
};

// UPDATE - posts
export const updatePostByID = async (id: string, formValues: Partial<BlogFormValues>) => {
	try {
		const { published_at, ...rest } = formValues;

		const publish_date = typeof published_at !== 'undefined' ? new Date(published_at) : null;
		const data = publish_date ? { ...rest, published_at: publish_date } : { ...rest };

		const updatedPost = await prisma.post.update({
			where: { id },
			data,
		});
		return updatedPost;
	} catch (error) {
		throw json(error);
	}
};

// DELETE
// DELETE - bookmark
export const deleteBookmarkByID = async (id: string) => {
	try {
		const deletedPost = await prisma.bookmark.delete({ where: { id } });
		return deletedPost;
	} catch (error) {
		throw json(error);
	}
};

// DELETE - post
export const deletePostByID = async (id: string) => {
	try {
		const deletedPost = await prisma.post.delete({ where: { id } });
		return deletedPost;
	} catch (error) {
		throw json(error);
	}
};
