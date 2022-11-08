import { Role } from '@prisma/client';

interface FormValues {
	[k: string]: string | Role | File | undefined;
}

// Contact route ( TODO: Fix this, it smells of over-typing)
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

// Auth
export interface LoginFormValues extends FormValues {
	email: string;
	password: string;
}

// Users
export interface UserFormValuesCreate extends FormValues {
	email: string;
	password: string;
	name_first: string;
	name_middle?: string;
	name_last: string;
	role?: Role;
}
export interface UserFormValuesUpdate extends FormValues {
	email?: string;
	password?: string;
	name_first?: string;
	name_middle?: string;
	name_last?: string;
	role?: Role;
}

export interface UserFormValuesAllFormSubmission extends UserFormValuesUpdate {
	select_user?: string;
}
