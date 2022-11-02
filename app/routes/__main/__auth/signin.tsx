// GLOBALS
import { Form, useActionData } from '@remix-run/react';
import React from 'react';

// COMPONENTS
import { Button, links as buttonLinks } from 'components/Button';
import { ContainerCenter, links as containerCenterLinks } from 'components/ContainerCenter';
import { Input, links as inputLinks } from 'components/Input';

// TYPES
import { ActionFunction, LinksFunction } from '@remix-run/node';
enum SignInActions {
	SIGNUP = 'signup',
	SIGNIN = 'signin',
}
type SignInActionValues = `${SignInActions}`;

export const action: ActionFunction = async () => {
	// Do stuff
};

export const links: LinksFunction = () => {
	return [...buttonLinks(), ...containerCenterLinks(), ...inputLinks()];
};

export default function SignIn() {
	// HOOKS - GLOBAL
	const data = useActionData();

	// HOOKS - STATE
	const [action, setAction] = React.useState<SignInActionValues>('signin');
	const [errors, setErrors] = React.useState(data?.errors);
	const [fields, setFields] = React.useState(data?.fields);

	// HOOKS - EFFECTS
	React.useEffect(() => {
		setErrors(data?.errors);
		setFields(data?.fields);
	}, [data]);

	// HANDLER
	const onChange = () => {
		setAction((previousAction) =>
			previousAction === SignInActions.SIGNIN ? SignInActions.SIGNUP : SignInActions.SIGNIN
		);
	};

	// VARS
	const headline = action === SignInActions.SIGNUP ? 'Sign Up' : 'Sign In';

	return (
		<ContainerCenter className='jdg-signin-container-center'>
			<h2>{headline}</h2>

			<div className='jdg-signin-form-container'>
				<Form action={`/${action}`} className='jdg-signin-form' method='post'>
					{/* TODO: Signup is currently only for anyone I invite to guest blog or w/e. 
										If actually opening up to random users for whatever reason,
										set up passwordless magic link and use that for signup flow instead */}
					<label htmlFor='action-toggle'>
						<span
							hidden
						>{`Toggle form action: sign in or sign up. Currently set to: ${action}`}</span>
						<input
							defaultChecked={action === 'signin'}
							type='checkbox'
							name='action-toggle'
							onChange={onChange}
							id='jdg-signin-form-action'
						/>
					</label>

					<div className='jdg-signup-form-input-fields'>
						{/* If form error not related to any input */}
						{/* TODO: Create subcomponent, add icon, make nice with animations */}
						{errors?.form && <div className='jdg-signup-form-error-message'>{errors?.form}</div>}

						{/* Only need name fields on signup */}
						{action === 'signup' && (
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
									label='First Name'
									name='name_first'
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
							<Input
								error={errors?.password}
								label='Password'
								name='password'
								type='text'
								defaultValue={fields?.password}
							/>
						</fieldset>
						<Button>{headline}</Button>
					</div>
				</Form>
			</div>
		</ContainerCenter>
	);
}
