// GLOBALS
import { Form, useActionData, useLoaderData, useParams } from '@remix-run/react';
import { json, redirect } from '@remix-run/node';
import React from 'react';

// COMPONENTS
import { Input } from 'components/Input';
import { Button } from 'components/Button';

// SERVICES
import * as users from 'services/users.server';

// UTILS
import { isValidEmail, isValidPassword, isValidInputLength } from 'utils/utils.server';
import { titleCase } from 'utils/utils';

// TYPES
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { AdminActions } from 'types/types';
import { Role as UserRole, User } from '@prisma/client';
import type {
	UserFormValuesCreate,
	UserFormValuesAllFormSubmission,
	UserFormValuesUpdate,
} from 'types/types.server';

// EXPORTS
export const action: ActionFunction = async ({ params, request }) => {
	const submission: FormData = await request.formData();
	const fields: UserFormValuesAllFormSubmission = Object.fromEntries(submission);
	const fieldsNormalized = { ...fields };
	delete fieldsNormalized.select_user;

	// VALIDATION
	const errors: Record<keyof typeof fields, string | undefined> = {};
	switch (params.action) {
		// CREATE
		case AdminActions.CREATE:
			for (let input in fields) {
				if (input === 'name_middle') continue; // Middle name not required

				if (!isValidInputLength(fields[input], 1)) {
					const fieldNameForDisplay = input.includes('name') ? 'Name' : titleCase(input);
					errors[input] = `User's ${fieldNameForDisplay} is required`;
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
				return json({ errors, fields }, { status: 422 });
			}

		// UPDATE
		case AdminActions.UPDATE:
			if (!fields.select_user) {
				errors.form = 'Sorry, please select a user to update.';
				return json({ errors, fields }, 404);
			}

			for (let input in fields) {
				if (input === 'name_middle') continue; // Middle name not required

				// Unadded inputs (all not required for updating)
				if (fields[input] === '' || !fields[input]) continue;

				// If input exists, validate it
				if (fields[input] && !isValidInputLength(fields[input], 1)) {
					const fieldNameForDisplay = input.includes('name') ? 'Name' : titleCase(input);
					errors[input] = `User's ${fieldNameForDisplay} is required`;
				}
			}

			// Check for email and valid email
			if (fields.email && !isValidEmail(fields.email)) {
				errors.email = 'Please provide a valid email address.';
			}

			// Check for pw and valid pw
			if (fields.password && !isValidPassword(fields.password)) {
				errors.password =
					'A valid password needs 8 characters, including 1 uppercase letter, 1 lowercase, 1 number, and 1 special character.';
			}

		case AdminActions.DELETE:
			console.log('No validation needed for deleting user');

		default:
			console.log('No validation happened, the route is not found :', request.url);
	}

	// Removing empty fields to avoid updating things to '' or undefined
	for (let input in fields) {
		if (fields[input] === '' || !fields[input]) {
			delete fieldsNormalized[input];
		}
	}

	// ACTIONS
	switch (params.action) {
		case AdminActions.CREATE:
			try {
				const { id } = await users.createNewUser(fields as UserFormValuesCreate);
				const updatedUser = await users.getUserByID(id);

				return json(updatedUser, { status: 200 });
			} catch (error) {
				return json(error);
			}

		case AdminActions.UPDATE:
			try {
				const updatedUser = await users.updateUserByID(
					String(fields.select_user),
					fieldsNormalized as UserFormValuesUpdate
				);

				return json({ user: updatedUser }, { status: 200 });
			} catch (error) {
				return json(error);
			}

		case AdminActions.DELETE:
			try {
				const deletedUser = await users.deleteUserByID(String(fields.select_user));
				return json({ user: deletedUser }, { status: 200 });
			} catch (error) {
				return json(error);
			}

		default:
			throw new Error('That is not a valid admin route');
	}
};

export const loader: LoaderFunction = async () => {
	const allUsers = await users.getUsersAll();
	return json({ users: allUsers });
};

export default function UsersUpdater() {
	// HOOKS - GLOBAL
	const actionData = useActionData();
	const loaderData = useLoaderData();
	const { action } = useParams();

	console.log({ actionData, loaderData });

	// HOOKS - STATE
	const [errors, setErrors] = React.useState(actionData?.errors);
	const [errorMessage, setErrorMessage] = React.useState(
		actionData?.errors?.form || actionData?.message
	);
	const [fields, setFields] = React.useState(actionData?.fields);
	const [selectedUser, setSelectedUser] = React.useState<User | undefined>(undefined);
	const [role, setRole] = React.useState<string | undefined>(undefined);
	const [users, setUsers] = React.useState<User[]>(loaderData?.users);
	const [userUpdated, setUserUpdated] = React.useState<User>(actionData?.user);

	// HOOKS - EFFECTS
	React.useEffect(() => {
		setErrors(actionData?.errors);
		setErrorMessage(actionData?.errors?.form || actionData?.message);
		setFields(actionData?.fields);
		setUserUpdated(actionData?.user);
	}, [actionData]);

	React.useEffect(() => {
		setUsers(loaderData?.users);
	}, [loaderData]);

	React.useEffect(() => {
		setRole(selectedUser?.role);
	}, [selectedUser]);

	// Handlers
	const handleOnSelectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const user = users.find((user) => user.id === event?.target?.value);
		setSelectedUser(user);
	};

	const handleOnSelectRole = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setRole(event?.target?.value);
	};
	// VARS
	const actionDisplay = `${titleCase(action)} User`;

	return (
		<Form
			action={`/admin/users/${action}`}
			className='jdg-admin-form jdg-admin-form-users'
			method='put'
		>
			{/* Headline */}
			<h3>{actionDisplay}</h3>

			{/* Status display divs */}
			{errorMessage && <div className='jdg-admin-error-message'>{errorMessage}</div>}
			{userUpdated && (
				<div className='jdg-admin-update-message'>
					{userUpdated.name_first} {userUpdated.name_last} was {action}d
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
			{action !== AdminActions.DELETE && (
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
				</>
			)}

			{/* Submit */}
			<Button type='submit'>{actionDisplay}</Button>
		</Form>
	);
}
