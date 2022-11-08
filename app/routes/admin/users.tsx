// GLOBALS
import React from 'react';
import { useFetcher, useFormAction, useLoaderData, useParams } from '@remix-run/react';
import { json, redirect } from '@remix-run/node';

// COMPONENTS
import { Input } from 'components/Input';
import { Button } from 'components/Button';

// SERVICES
import * as users from 'services/users.server';

// UTILS
import { titleCase } from 'utils/utils';

// TYPES
import type { LoaderFunction } from '@remix-run/node';
import { Role as UserRole, User } from '@prisma/client';
import { AdminActions } from 'types/types';

// EXPORTS
export const loader: LoaderFunction = async ({ params }) => {
	if (!params.action) {
		return redirect('users/update');
	}

	const allUsers = await users.getUsersAll();
	return json({ users: allUsers });
};

export default function UsersAdmin() {
	// HOOKS - GLOBAL
	const usersFetcher = useFetcher();
	const deleteAction = useFormAction('delete');
	const loaderData = useLoaderData();
	const { action } = useParams();

	// HOOKS - STATE
	const [errors, setErrors] = React.useState(usersFetcher?.data?.errors);
	const [errorMessage, setErrorMessage] = React.useState(
		usersFetcher?.data?.errors?.form ?? usersFetcher?.data?.message
	);
	const [fields, setFields] = React.useState(usersFetcher?.data?.fields);
	const [selectedUser, setSelectedUser] = React.useState<User | undefined>(undefined);
	const [role, setRole] = React.useState<string | undefined>(undefined);
	const [users, setUsers] = React.useState<User[]>(loaderData?.users);
	const [userUpdated, setUserUpdated] = React.useState<User>(usersFetcher?.data?.user);

	// HOOKS - EFFECTS
	// On action change
	React.useEffect(() => {
		if (errors && usersFetcher?.data) {
			setErrors(undefined);
		}

		if (fields && usersFetcher?.data) {
			setFields(undefined);
		}
	}, [action]);

	// On fetcher change
	React.useEffect(() => {
		setErrors(usersFetcher?.data?.errors);
		setErrorMessage(usersFetcher?.data?.errors?.form ?? usersFetcher?.data?.message);
		setFields(usersFetcher?.data?.fields);
		setUserUpdated(usersFetcher?.data?.user);
	}, [usersFetcher?.data]);

	// On loader re-fire
	React.useEffect(() => {
		setUsers(loaderData?.users);
	}, [loaderData]);

	// On select user change
	React.useEffect(() => {
		setFields(selectedUser);
		setRole(selectedUser?.role);
	}, [selectedUser]);

	// Handlers
	function handleOnSelectUser(event: React.ChangeEvent<HTMLSelectElement>) {
		const user = users.find((user) => user.id === event?.target?.value);
		setSelectedUser(user);
	}

	function handleOnSelectRole(event: React.ChangeEvent<HTMLSelectElement>) {
		setRole(event?.target?.value);
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		const hasDeleteAction = event.currentTarget.querySelector(
			'button[formaction="/admin/users/delete"]'
		);
		if (hasDeleteAction) {
			return !confirm('Are you sure?') ? event.preventDefault() : true;
		}
	}

	// VARS
	const actionDisplay = `${titleCase(action)} User`;

	return (
		<usersFetcher.Form
			action={action}
			className='jdg-admin-form jdg-admin-form-users'
			method='put'
			onSubmit={handleSubmit}
		>
			{/* Headline */}
			<h3>{actionDisplay}</h3>

			{/* Status display divs */}
			{errorMessage && <div className='jdg-admin-error-message'>{errorMessage}</div>}
			{userUpdated && (
				<div className='jdg-admin-update-message'>
					User {userUpdated.name_first} {userUpdated.name_last} was updated.
				</div>
			)}

			{/* Select box to get all users */}
			{action !== AdminActions.CREATE && users && (
				<div className='jdg-input jdg-input-select'>
					<label htmlFor='select_user'>Select User</label>
					<select
						defaultValue='selectUser'
						name='select_user'
						onChange={handleOnSelectUser}
						id='select_user'
					>
						<option value='selectUser' disabled hidden>
							Select a User to {action}
						</option>
						{users.map((user) => {
							const name = `${titleCase(user.name_first)} ${titleCase(user.name_last)}`;
							return (
								<option key={name} value={user.id}>
									{name}
								</option>
							);
						})}
					</select>
				</div>
			)}

			{/* Form fields */}
			{/* Memoize inputs to prevent re-renders on select menu changes */}
			{/* TODO: add such memoization to Input component by default?? */}
			{React.useMemo(() => {
				return (
					<>
						<Input
							defaultValue={fields?.name_first}
							error={errors?.name_first}
							label='First Name'
							name='name_first'
							type='text'
						/>
						<Input
							defaultValue={fields?.name_middle}
							error={errors?.name_middle}
							label='Middle Name or Initial'
							name='name_middle'
							type='text'
						/>
						<Input
							defaultValue={fields?.name_last}
							error={errors?.name_last}
							label='Last Name'
							name='name_last'
							type='text'
						/>
						<Input
							defaultValue={fields?.email}
							error={errors?.email}
							id='email'
							label='Email'
							name='email'
							type='text'
						/>
						<Input error={errors?.password} label='Password' name='password' type='password' />
					</>
				);
			}, [action, fields, errors])}

			{/* TODO: create and style select input component */}
			<div className='jdg-input jdg-input-select'>
				<label htmlFor='role'>Role</label>
				<select
					id='role'
					name='role'
					defaultValue='selectRole'
					onChange={handleOnSelectRole}
					value={role}
				>
					<option value='selectRole' disabled hidden>
						Select a Role
					</option>
					;
					{Object.values(UserRole).map((role) => {
						return (
							<option key={role} value={role}>
								{titleCase(role)}
							</option>
						);
					})}
				</select>
			</div>

			{/* Submit */}
			<Button type='submit'>{actionDisplay}</Button>

			{action !== AdminActions.CREATE && (
				<>
					<h3>Delete User</h3>
					<Button formAction={deleteAction} type='submit'>
						Delete User
					</Button>
				</>
			)}
		</usersFetcher.Form>
	);
}
