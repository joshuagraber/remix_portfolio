// GLOBALS
import bcrypt from 'bcrypt';
import { createCookieSessionStorage, json, redirect } from '@remix-run/node';

// DB
import { prisma } from './prisma.server';

// SERVICES
import * as users from './users.server';

// TYPES
import type { LoginFormValues, UserFormValues } from 'types/types.server';
import { Role, User } from '@prisma/client';

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

// AUTH
// New user sign up
export const signup = async (formValues: UserFormValues, redirectTo: string = '/') => {
	const usersWithEmail = await prisma.user.count({ where: { email: formValues.email } });

	if (usersWithEmail > 0)
		return json({ errors: { form: 'A user already exists with that email.' } }, { status: 400 });

	const newUser = await users.createNewUser(formValues);

	if (!newUser) {
		return json(
			{
				errors: {
					form: 'Something went wrong when trying to create a new user. \n Please try again.',
				},
			},
			{
				status: 400,
			}
		);
	}

	return createSession(newUser.id, redirectTo);
};

// Existing user sign in
export const signin = async (formValues: LoginFormValues, redirectTo: string = '/') => {
	const user = await prisma.user.findUnique({
		where: { email: formValues.email },
	});

	const isPasswordMatch = await bcrypt.compare(formValues.password, String(user?.password));

	if (!user || !isPasswordMatch)
		return json({
			errors: { form: 'Incorrect login' },
			status: 400,
		});

	return createSession(user.id, redirectTo);
};

// Sign out
export const signout = async (request: Request) => {
	const session = await getUserSession(request);

	if (!session) {
		return json({
			errors: { form: 'Error getting user session.' },
			status: 404,
		});
	}

	return redirect('/sign/in', {
		headers: {
			'Set-Cookie': await storage.destroySession(session),
		},
	});
};

// SESSIONS
export const createSession = async (userID: string, redirectTo: string = '/') => {
	// Create session
	const session = await storage.getSession();

	// Set user to session
	session.set('userID', userID);

	// Redirect
	return redirect(redirectTo, {
		headers: {
			'Set-Cookie': await storage.commitSession(session),
		},
	});
};

export const requireUserId = async (
	request: Request,
	redirectTo: string = new URL(request.url).pathname
) => {
	const session = await getUserSession(request);
	const user = await getUser(request);

	// Protect admin route from everyone who's not me.
	if (redirectTo.includes('admin') && user?.role !== Role.ADMIN) {
		throw redirect('/not-authorized');
	}

	// If no user, send to sign in
	if (!user?.id || typeof user.id !== 'string') {
		const redirectParam = new URLSearchParams([['redirect', redirectTo]]);
		throw redirect(`/sign/in/?${redirectParam}`, {
			headers: {
				'Set-Cookie': await storage.commitSession(session),
			},
		});
	}
	return user.id;
};

export const getUserSession = (request: Request) => {
	return storage.getSession(request.headers.get('Cookie'));
};

export const getUserID = async (request: Request) => {
	const session = await getUserSession(request);
	const userID = session.get('userID');

	if (!userID || typeof userID !== 'string') return null;

	return userID;
};

export const getUser = async (request: Request) => {
	const userID = await getUserID(request);
	if (typeof userID !== 'string') return null;

	try {
		const user = await prisma.user.findUnique({
			where: { id: userID },
			select: { id: true, email: true, name_first: true, name_last: true, role: true },
		});
		return user;
	} catch (error) {
		throw signout(request);
	}
};
