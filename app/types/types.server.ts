export interface LoginForm {
	email: string;
	password: string;
}

export interface RegisterForm {
	email: string;
	password: string;
	name_first: string;
	name_middle?: string;
	name_last: string;
}
