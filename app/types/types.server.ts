export type ActionDataValuesReturned = string | undefined;

export type ActionDataKeysReturned =
	| 'form'
	| 'name_first'
	| 'name_middle'
	| 'name_last'
	| 'email'
	| 'message'
	| 'password';

export type ReturnedActionData = Record<ActionDataKeysReturned, ActionDataValuesReturned>;

export interface RouteActionData {
	errors?: ReturnedActionData;
	fields?: ReturnedActionData;
	name_first?: ActionDataValuesReturned;
}
export interface RouteActionDataSelf {
	data?: RouteActionData;
}

export interface LoginFormValues {
	email: string;
	password: string;
}

export interface RegisterFormValues {
	email: string;
	password: string;
	name_first: string;
	name_middle?: string;
	name_last: string;
}
