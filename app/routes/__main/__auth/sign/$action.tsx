// GLOBALS
import React from 'react';
import { useActionData, useParams } from '@remix-run/react';
import { json, LoaderFunction, redirect } from '@remix-run/node';

// COMPONENTS
import { Input, links as inputLinks } from 'components/Input';

// HOOKS
import { useEffectDidUpdate } from 'hooks/useEffectDidUpdate';

// SERVICES
import * as authenticator from 'services/auth.server';

// UTILS
import { titleCase } from 'utils/utils';
import { isValidEmail, isValidInputLength, isValidPassword } from 'utils/utils.server';

// TYPES
import type { ActionFunction, LinksFunction } from '@remix-run/node';
import { SignInActions } from 'types/types';

// EXPORTS
export const action: ActionFunction = async ({ params, request }) => {
	const submission: FormData = await request.formData();
	const fields = Object.fromEntries(submission);
	const errors: Record<keyof typeof fields, string | undefined> = {};

	const url = new URL(request.url);
	const redirect = url.searchParams.get('redirect');

	// Create new fields object withouot password, so as not to pass unhashed pw back to client.
	const fieldsToReturn = { ...fields, password: undefined };

	// FORM VALIDATION
	// Don't perform validation if action is signout.
	if (params.action !== SignInActions.SIGNOUT) {
		// Check that submission is returned with data

		if (!submission) {
			errors.form = 'Sorry, there was an error finding that user. \n Please try again.';
			return json({ errors, fields: fieldsToReturn }, 404);
		}

		// Check that submission exists for required fields
		for (let input in fields) {
			if (input === 'name_middle') continue; // Middle name not required

			if (!isValidInputLength(fields[input], 1)) {
				const fieldNameForDisplay = input.includes('name') ? 'Name' : titleCase(input);
				errors[input] = `Your ${fieldNameForDisplay} is required`;
			}
		}

		// Check for valid email
		if (!fields.email || !isValidEmail(fields.email)) {
			errors.email = 'Please provide a valid email address.';
		}

		// And valid password
		if (!fields.password || !isValidPassword(fields.password)) {
			errors.password =
				'A valid password needs 8 characters, including 1 uppercase letter, 1 lowercase, 1 number, and 1 special character.';
		}

		// Return all errors for form validation on the client,
		if (Object.values(errors).some(Boolean)) {
			return json({ errors, fields: fieldsToReturn }, { status: 422 });
		}
	}

	// Need email and password for both sign in and sign up
	const { email, password } = fields;
	const signInValues = { email: String(email), password: String(password) };
	const redirectTo = redirect ?? '/';

	switch (params.action) {
		case SignInActions.SIGNIN:
			try {
				return await authenticator.signin({ ...signInValues }, redirectTo);
			} catch (error) {
				console.error(error);
				return json({ error });
			}

		case SignInActions.SIGNUP:
			// Autofail until I need this
			return json({
				errors: {
					form: 'Sorry, this signup link is invalid. Please send me a message if you think you should have access',
				},
			});
		// Only need name fields for signup
		// const { name_first, name_middle, name_last } = fields;
		// const signUpValues = {
		// 	...signInValues,
		// 	name_first: String(name_first),
		// 	name_middle: String(name_middle),
		// 	name_last: String(name_last),
		// };

		// try {
		// 	return await authenticator.signup({ ...signUpValues }, redirectTo);
		// } catch (error) {
		// 	console.error(error);
		// 	return json({ error });
		// }

		case SignInActions.SIGNOUT:
			try {
				return await authenticator.signout(request);
			} catch (error) {
				console.error(error);
				return json({ error });
			}

		default:
			throw new Error(
				`Sorry, ${request.url} is not a valid authentication url. \n 
        Please check the link at ${redirectTo ?? request.referrer} that sent you here.`
			);
	}
};

export const links: LinksFunction = () => {
	return [...inputLinks()];
};

export const loader: LoaderFunction = async ({ params, request }) => {
	// Sign out
	if (params.action === SignInActions.SIGNOUT) {
		const userID = await authenticator.getUserID(request);
		if (!userID) {
			return redirect('/sign/in');
		}

		return null;
	}

	// Sign in / sign up
	return (await authenticator.getUser(request)) ? redirect('/') : null;
};

export default function AuthFormFields() {
	// HOOKS - GLOBAL
	const actionData = useActionData();
	const { action }: { action?: SignInActions } = useParams();

	if (typeof action !== 'undefined' && Boolean(!Object.values(SignInActions).includes(action))) {
		throw new Error('This is not a valid authentication route');
	}

	// HOOKS - STATE
	const [errors, setErrors] = React.useState(actionData?.errors);
	const [fields, setFields] = React.useState(actionData?.fields);

	// HOOKS - EFFECTS
	React.useEffect(() => {
		setErrors(actionData?.errors);
		setFields(actionData?.fields);
	}, [actionData]);

	useEffectDidUpdate(() => {
		if (!actionData && fields) {
			setFields(undefined);
		}
	}, [fields]);

	return (
		<div className='jdg-signup-form-input-fields'>
			{/* Return nothing if signout route */}
			{action !== SignInActions.SIGNOUT && (
				<>
					{errors?.form && <div className='jdg-signup-form-error-message'>{errors?.form}</div>}
					{/* Only return name fields for signup */}
					{action === SignInActions.SIGNUP && (
						<fieldset name='name'>
							<Input
								error={errors?.name_first}
								label='First Name'
								name='name_first'
								type='text'
								defaultValue={fields?.name_first}
							/>
							<Input
								error={errors?.name_last}
								label='Last Name'
								name='name_last'
								type='text'
								defaultValue={fields?.name_last}
							/>
						</fieldset>
					)}
					{/* Return email and pw for signup and signin */}
					<fieldset name='login-info'>
						<Input
							error={errors?.email}
							label='Email'
							name='email'
							type='text'
							defaultValue={fields?.email}
						/>
						<Input error={errors?.password} label='Password' name='password' type='password' />
					</fieldset>
				</>
			)}
		</div>
	);
}
