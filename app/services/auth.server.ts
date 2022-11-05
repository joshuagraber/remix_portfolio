// GLOBALS
import bcrypt from 'bcrypt';
import { createCookieSessionStorage, json, redirect } from '@remix-run/node';

// DB
import { prisma } from './prisma.server';

// TYPES
import type { LoginFormValues, RegisterFormValues } from 'types/types.server';

// SERVICES
import { createNewUser } from './users.server';

// VARS
const secret = process.env.SESSION_SECRET;

if (!secret) {
	throw new Error('SESSION_SECRET is not defined');
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

export const signup = async (formValues: RegisterFormValues, redirectTo: string = '/') => {
	const usersWithEmail = await prisma.user.count({ where: { email: formValues.email } });

	if (usersWithEmail > 0) return json('A user already exists with that email.', { status: 400 });

	const newUser = await createNewUser(formValues);

	if (!newUser) {
		return json('Something went wrong when trying to create a new user. \n Please try again.', {
			status: 400,
		});
	}

	return createSession(newUser.id, redirectTo);
};

export const signin = async (formValues: LoginFormValues, redirectTo: string = '/') => {
	const user = await prisma.user.findUnique({
		where: { email: formValues.email },
	});

	if (!user || !(await bcrypt.compare(formValues.password, user?.password)))
		return json({
			error: { form: 'Incorrect login' },
			status: 400,
		});

	// TODO: session and redirect
	return createSession(user.id, redirectTo);
};

export const createSession = async (userID: string, redirectTo: string = '/') => {
	// Create session
	console.debug('creating user session');
	const session = await storage.getSession();
	console.debug('user session created');

	// Set user to session
	session.set('userID', userID);
	console.debug('user assigned to session');

	console.debug('redirecting');

	// Redirect
	return redirect(redirectTo, {
		headers: {
			'Set-Cookie': await storage.commitSession(session),
		},
	});
};
