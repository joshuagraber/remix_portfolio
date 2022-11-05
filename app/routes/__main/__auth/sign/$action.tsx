// GLOBALS
import React from 'react';
import { useActionData, useLoaderData, useParams } from '@remix-run/react';
import { json } from '@remix-run/node';

// COMPONENTS
import { Input, links as inputLinks } from 'components/Input';

// SERVICES
import { signin, signup } from 'services/auth.server';

// UTILS
import { isValidEmail, isValidInputLength, isValidPassword } from 'utils/utils.server';

// MISC
import { startCase as _startCase, toLower as _toLower } from 'lodash';

// TYPES
import { ActionFunction, LinksFunction, LoaderFunction } from '@remix-run/node';
import { SignInActions } from 'types/types';
import { useEffectDidUpdate } from 'hooks/useEffectDidUpdate';
type LoginErrors = Record<string, string | undefined>;

// EXPORTS
export const action: ActionFunction = async ({ params, request }) => {
	const errors: LoginErrors = {};

	const url = new URL(request.url);
	const redirect = url.searchParams.get('redirect');

	const submission: FormData = await request.formData();
	const fields = Object.fromEntries(submission);
	// Create new fields object withouot password, so as not to pass unhashed pw back to client.
	const fieldsToReturn = { ...fields, password: undefined };

	// Check that submission is returned with data
	if (typeof submission === 'undefined') {
		errors.form = 'Sorry, there was an error finding that user. \n Please try again.';
		return json({ errors, fields: fieldsToReturn }, 404);
	}

	// Check that submission exists for required fields
	for (let input in fields) {
		if (input === 'name_middle') continue; // Middle name not required

		if (!isValidInputLength(fields[input], 1)) {
			const fieldNameForDisplay = input.includes('name') ? 'Name' : _startCase(_toLower(input));
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

	// Return all errors for form validation on the client
	if (Object.values(errors).some(Boolean)) {
		return json({ errors, fields: fieldsToReturn }, { status: 422 });
	}

	const { email, password } = fields;
	const signInValues = { email: String(email), password: String(password) };
	const redirectTo = `/${redirect}` ?? '/';

	switch (params.action) {
		case SignInActions.SIGNIN:
			try {
				console.debug('Logging user in');
				return await signin({ ...signInValues }, redirectTo);
			} catch (error) {
				console.error(error);
				return json({ error });
			}

		case SignInActions.SIGNUP:
			const { name_first, name_middle, name_last } = fields;
			const signUpValues = {
				...signInValues,
				name_first: String(name_first),
				name_middle: String(name_middle),
				name_last: String(name_last),
			};

			try {
				console.debug('Signing up new user');
				return await signup({ ...signUpValues }, redirectTo);
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

export default function AuthFormFields() {
	// HOOKS - GLOBAL
	const actionData = useActionData();
	const { action }: { action?: SignInActions.SIGNIN | SignInActions.SIGNUP } = useParams();

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
						error={errors?.name_middle}
						label='Middle Name'
						name='name_middle'
						type='text'
						defaultValue={fields?.name_middle}
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
		</div>
	);
}
