// GLOBALS
import {
	Form,
	Outlet,
	ShouldReloadFunction,
	useLocation,
	useMatches,
	useSearchParams,
	useSubmit,
	useTransition,
} from '@remix-run/react';
import React from 'react';
import styles from 'styles/index.css';

// COMPONENTS
import { Button, links as buttonLinks } from 'components/Button';
import { ContainerCenter, links as containerCenterLinks } from 'components/ContainerCenter';

// TYPES
import type { LinksFunction } from '@remix-run/node';
import { SignInActions } from 'types/types';

export const links: LinksFunction = () => {
	return [...buttonLinks(), ...containerCenterLinks(), { rel: 'stylesheet', href: styles }];
};

export default function AuthForm() {
	// HOOKS - GLOBAL
	const location = useLocation();
	const submit = useSubmit();
	const matches = useMatches();
	const [searchParams] = useSearchParams();
	const transition = useTransition();

	// VARS
	const routeMatch = matches.find((match) => match.pathname === location.pathname);
	const action = routeMatch?.params?.action;

	// Type predicate ensuring action is present
	if (typeof action === 'undefined') {
		throw new Error('This link is not valid');
	}

	// UTIL
	const getButtonText = () => {
		switch (action) {
			case SignInActions.SIGNOUT:
				return 'Sign Out';
			case SignInActions.SIGNUP:
				return 'Sign Up';
			default:
				return 'Sign In';
		}
	};

	// HANDLER
	const onChange = (event: React.FormEvent<HTMLFormElement>) => {
		submit(event.currentTarget, { replace: true });
	};

	// VARS
	const buttonText = getButtonText();
	const isSubmitting = transition.state === 'submitting';
	const nav = action === SignInActions.SIGNUP ? SignInActions.SIGNIN : SignInActions.SIGNUP;
	const redirect = searchParams.get('redirect');
	const authAction = redirect && redirect !== 'null' ? `${action}/?redirect=${redirect}` : action;
	const navAction = redirect && redirect !== 'null' ? `${nav}/?redirect=${redirect}` : nav;

	return (
		<ContainerCenter className='jdg-signin-container-center'>
			{/* <h2>{headline}</h2> */}

			{/* Context-dependent messages */}
			{action === SignInActions.SIGNOUT && (
				<p className='jdg-signin-form-alert'>Are you sure you want to sign out?</p>
			)}
			{redirect && <p className='jdg-signin-form-alert'>Please sign in to view that page.</p>}

			<div className='jdg-signin-form-container'>
				{action !== SignInActions.SIGNOUT && !redirect && (
					<div className='jdg-signin-form-switch-container'>
						{/* TODO: Signup is currently only for anyone I invite to guest blog or w/e. 
							If actually opening up to random users for whatever reason, set up
							passwordless magic link and use that for signup flow instead */}
						<Form action={navAction} className='jdg-signin-form-switch' onChange={onChange} replace>
							<input
								defaultChecked={action === SignInActions.SIGNIN}
								key={'jdg-signin-form'}
								type='checkbox'
								id='jdg-signin-form-action'
							/>
							<label htmlFor='jdg-signin-form-action'>
								<span
									hidden
								>{`Toggle form action: sign in or sign up. Currently set to: Sign ${action}`}</span>
							</label>
						</Form>
					</div>
				)}

				<div className='jdg-signin-form-signin-container'>
					<Form action={authAction} className='jdg-signin-form-signin' method='post'>
						{/* If form error not related to any input */}
						{/* TODO: Create subcomponent, add icon, make nice with animations */}

						<Outlet />
						<Button isLoading={isSubmitting} type='submit'>
							{buttonText}
						</Button>
					</Form>
				</div>
			</div>
		</ContainerCenter>
	);
}

export { ErrorBoundary } from 'components/ErrorBoundary';
