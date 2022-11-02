// GLOBALS
import bcrypt from 'bcrypt';
import { createCookieSessionStorage, json, redirect } from '@remix-run/node';
import { prisma } from './prisma.server';

// TYPES
import type { LoginForm, RegisterForm } from 'types/types.server';

// SERVICES
import { createNewUser } from './users.server';

// VARS
const secret = process.env.SESSION_SECRET;

if (!secret) {
	throw new Error('SESSION_SECRET is null');
}
const storage = createCookieSessionStorage({
	cookie: {
		name: 'jdg-session',
		secure: process.env.NODE_ENV === 'production',
		secrets: [secret],
		sameSite: 'lax',
		path: '/',
		maxAge: 60 * 60 * 24 * 30,
		httpOnly: true,
	},
});

export const signup = async (formValues: RegisterForm) => {
	const doesUserExist = await prisma.user.count({ where: { email: formValues.email } });

	if (doesUserExist)
		return json(
			{
				errors: { form: 'A user already exists with that email' },
			},
			{ status: 400 }
		);

	const newUser = await createNewUser(formValues);

	if (!newUser) {
		return json(
			{
				errors: { form: 'Something went wrong when trying to create a new user' },
				fields: { ...formValues },
			},
			{ status: 400 }
		);
	}

	// TODO: create session and redirect
	return createSession(newUser.id, '/');
};

export const signin = async (formValues: LoginForm) => {
	const user = await prisma.user.findUnique({
		where: { email: formValues.email },
	});

	if (!user || !(await bcrypt.compare(formValues.password, user?.password)))
		return json(
			{
				errors: { form: 'Incorrect login' },
			},
			{ status: 400 }
		);

	// TODO: session and redirect
	return createSession(user.id, '/');
};

export const createSession = async (userID: string, redirectTo: string = '/') => {
	const session = await storage.getSession();
	session.set('userID', userID);
	redirect(redirectTo, {
		headers: {
			'Set-Cookie': await storage.commitSession(session),
		},
	});
};
