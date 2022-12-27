import { Role, User } from '@prisma/client';

export type FormValue = string | string[] | Role | File | undefined | User | Date;

interface FormValues {
	[k: string]: FormValue;
}

// CONTACT ( TODO: Fix this, it reeks of over-typing)
type ActionDataValuesReturned = string | undefined;
type ActionDataKeysReturned = 'email' | 'form' | 'name_first' | 'name_last' | 'message';
type ReturnedActionData = Record<ActionDataKeysReturned, ActionDataValuesReturned>;

export interface RouteActionData {
	errors?: ReturnedActionData;
	fields?: ReturnedActionData;
	name_first?: ActionDataValuesReturned;
}
export interface RouteActionDataSelf {
	data?: RouteActionData;
}

// AUTH
export interface LoginFormValues extends FormValues {
	email: string;
	password: string;
}

// USERS
export interface UserFormValues extends FormValues {
	email: string;
	password: string;
	name_first: string;
	name_middle?: string;
	name_last: string;
	role?: Role;
}
export interface UserFormValuesAllFormSubmission extends UserFormValues {
	select_user?: string;
}

// BLOG
export interface BlogFormValues extends FormValues {
	author_id: string;
	content: string;
	images: string[];
	image_featured: string;
	image_featured_alt: string;
	slug: string;
	tagline: string;
	tags: string[];
	title: string;
	published_at: string;
	select_post?: string;
}

export interface BookmarkFormValues extends FormValues {
	image_url: string;
	tagline: string;
	title: string;
	url: string;
}

// Sitemap

export interface SitemapEntry {
	route: string;
	lastmod?: string;
	changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
	priority?: 0.0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1.0;
}
