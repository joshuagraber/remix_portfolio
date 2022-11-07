// GLOBALS
import {
	Form,
	Outlet,
	useLocation,
	useMatches,
	useSearchParams,
	useSubmit,
	useTransition,
} from '@remix-run/react';
import React from 'react';
import { useRouteData } from 'remix-utils';

// COMPONENTS
import { Button, links as buttonLinks } from 'components/Button';
import { ContainerCenter, links as containerCenterLinks } from 'components/ContainerCenter';

// TYPES
import { LinksFunction } from '@remix-run/node';
import type { RouteActionData } from 'types/types.server';
import { SignInActions } from 'types/types';

export const links: LinksFunction = () => {
	return [...buttonLinks(), ...containerCenterLinks()];
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

	// HOOKS - GLOBAL
	const data: RouteActionData | undefined = useRouteData(`routes/sign/${action}`);

	// HOOKS - STATE
	const [errorMessage, setErrorMessage] = React.useState(data?.errors?.form);

	// HOOKS - EFFECTS
	React.useEffect(() => {
		setErrorMessage(data?.errors?.form);
	}, [data]);

	// UTIL
	const getHeadline = () => {
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
	const headline = getHeadline();
	const isSubmitting = transition.state === 'submitting';
	const nav = action === SignInActions.SIGNUP ? SignInActions.SIGNIN : SignInActions.SIGNUP;
	const redirect = searchParams.get('redirect');
	const authAction = redirect && redirect !== 'null' ? `${action}/?redirect=${redirect}` : action;
	const navAction = redirect && redirect !== 'null' ? `${nav}/?redirect=${redirect}` : nav;

	return (
		<ContainerCenter className='jdg-signin-container-center'>
			<h2>{headline}</h2>

			<div className='jdg-signin-form-container'>
				{/* TODO: Signup is currently only for anyone I invite to guest blog or w/e. 
							If actually opening up to random users for whatever reason, set up
							passwordless magic link and use that for signup flow instead */}
				{action !== SignInActions.SIGNOUT && (
					<Form action={navAction} onChange={onChange} replace>
						<label>
							<span
								hidden
							>{`Toggle form action: sign in or sign up. Currently set to: Sign ${action}`}</span>
							<input
								defaultChecked={action === SignInActions.SIGNIN}
								type='checkbox'
								id='jdg-signin-form-action'
							/>
						</label>
					</Form>
				)}
				{action === SignInActions.SIGNOUT && <p>Are you sure you want to sign out?</p>}
				{redirect && <p>Please log in to view that page.</p>}
				<Form action={authAction} className='jdg-signin-form' method='post'>
					{/* If form error not related to any input */}
					{/* TODO: Create subcomponent, add icon, make nice with animations */}
					{errorMessage && <div className='jdg-signup-form-error-message'>{errorMessage}</div>}
					<Outlet />
					<Button isLoading={isSubmitting} type='submit'>
						{headline}
					</Button>
				</Form>
			</div>
		</ContainerCenter>
	);
}

export { ErrorBoundary } from 'components/ErrorBoundary';
