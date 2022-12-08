// GLOBALS
import bcrypt from 'bcrypt';
import { createCookieSessionStorage, json, redirect } from '@remix-run/node';

// DB
import { prisma } from './prisma.server';

// TYPES
import type { LoginFormValues, UserFormValues } from 'types/types.server';

// SERVICES
import * as users from './users.server';

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
		throw json(
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

	try {
		return createSession(newUser.id, redirectTo);
	} catch (error) {
		throw json(error);
	}
};

// Existing user sign in
export const signin = async (formValues: LoginFormValues, redirectTo: string = '/') => {
	const user = await prisma.user.findUnique({
		where: { email: formValues.email },
	});

	const isPasswordMatch = await bcrypt.compare(formValues.password, String(user?.password));

	if (!user || !isPasswordMatch)
		throw json({
			errors: { form: 'Incorrect login' },
			status: 400,
		});

	try {
		return createSession(user.id, redirectTo);
	} catch (error) {
		throw json(error);
	}
};

// Sign out
export const signout = async (request: Request) => {
	const session = await getUserSession(request);

	if (!session) {
		throw json({
			errors: { form: 'Error getting user session.' },
			status: 404,
		});
	}

	try {
		return redirect('/sign/in', {
			headers: {
				'Set-Cookie': await storage.destroySession(session),
			},
		});
	} catch (error) {
		throw json(error);
	}
};

// SESSIONS
export const createSession = async (userID: string, redirectTo: string = '/') => {
	// Create session
	const session = await storage.getSession();

	// Set user to session
	session.set('userID', userID);

	// Redirect
	try {
		return redirect(redirectTo, {
			headers: {
				'Set-Cookie': await storage.commitSession(session),
			},
		});
	} catch (error) {
		throw json(error);
	}
};

export const requireUserId = async (
	request: Request,
	redirectTo: string = new URL(request.url).pathname
) => {
	try {
		const session = await storage.getSession(request.headers.get('Cookie'));
		const userID = session.get('userID');

		if (!userID || typeof userID !== 'string') {
			const redirectParam = new URLSearchParams([['redirect', redirectTo]]);
			throw redirect(`/sign/in/?${redirectParam}`, {
				headers: {
					'Set-Cookie': await storage.commitSession(session),
				},
			});
		}
		return userID;
	} catch (error) {
		throw json(error);
	}
};

export const getUserSession = (request: Request) => {
	try {
		return storage.getSession(request.headers.get('Cookie'));
	} catch (error) {
		throw json(error);
	}
};

export const getUserID = async (request: Request) => {
	try {
		const session = await getUserSession(request);
		const userID = session.get('userID');

		if (!userID || typeof userID !== 'string') {
			throw json('that user does not exist', { status: 422 });
		}

		return userID;
	} catch (error) {
		throw json(error);
	}
};

export const getUser = async (request: Request) => {
	try {
		const userID = await getUserID(request);
		if (typeof userID !== 'string') {
			throw json('that user does not exist', { status: 422 });
		}

		const user = await prisma.user.findUnique({
			where: { id: userID },
			select: { id: true, email: true, name_first: true, name_last: true },
		});
		return user;
	} catch (error) {
		throw signout(request);
	}
};
