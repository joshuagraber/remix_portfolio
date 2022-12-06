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
	slug: string;
	tagline: string;
	tags: string[];
	title: string;
	published_at: Date;
}
