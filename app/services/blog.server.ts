// GLOBALS
import { json } from '@remix-run/node';

// DB
import { prisma } from 'services/prisma.server';

// TYPES
import type { BlogFormValues } from 'types/types.server';

/////////////////// API
// CREATE
export const createNewPost = async (formValues: BlogFormValues) => {
	try {
		let { published_at, ...rest } = formValues;
		published_at = new Date(published_at);

		const newBlogPost = await prisma.post.create({
			data: { published_at, ...rest },
		});

		return newBlogPost;
	} catch (error) {
		throw json(error);
	}
};

// READ
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
export const updatePostByID = async (id: string, formValues: Partial<BlogFormValues>) => {
	try {
		const updatedPost = await prisma.post.update({
			where: { id },
			data: formValues,
		});
		return updatedPost;
	} catch (error) {
		throw json(error);
	}
};

// DELETE
export const deletePostByID = async (id: string) => {
	try {
		const deletedPost = await prisma.post.delete({ where: { id } });
		return deletedPost;
	} catch (error) {
		throw json(error);
	}
};
