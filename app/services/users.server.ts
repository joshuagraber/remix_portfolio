// GLOBALS
import { json } from 'remix-utils';

// DB
import { prisma } from 'services/prisma.server';

// MISC
import bcrypt from 'bcrypt';

// TYPES
import type { UserFormValuesCreate, UserFormValuesUpdate } from 'types/types.server';
import type { Role as UserRole } from '@prisma/client';

// Create
// TODO: Update RegisterFormValues type to include additional optional vals from admin form
export const createNewUser = async (formValues: UserFormValuesCreate) => {
	const hashedPassword = await bcrypt.hash(formValues.password, 10);
	const { email, name_first, name_middle, name_last } = formValues;

	const newUser = await prisma.user.create({
		data: {
			email,
			password: hashedPassword,
			name_first,
			name_middle: name_middle ?? '',
			name_last,
		},
	});

	return { id: newUser.id, email: newUser.email };
};

// Read
export const getUsersAll = async () => {
	try {
		return await prisma.user.findMany();
	} catch (error) {
		return json({ error });
	}
};

export const getUsersByRole = async (role: UserRole) => {
	try {
		return await prisma.user.findMany({ where: { role: role } });
	} catch (error) {
		return json({ error });
	}
};

export const getUserByID = async (id: string) => {
	try {
		return await prisma.user.findUniqueOrThrow({ where: { id: id } });
	} catch (error) {
		return json({ error });
	}
};

// Update
export const updateUserByID = async (id: string, formValues: UserFormValuesUpdate) => {
	const data = { ...formValues };

	if (data?.password) {
		data.password = await bcrypt.hash(data.password, 10);
	}

	try {
		const updatedUser = prisma.user.update({
			where: { id: id },
			data,
		});

		return updatedUser;
	} catch (error) {
		return json({ errors: error, fields: { ...formValues, password: undefined } });
	}
};

// Delete
export const deleteUserByID = async (id: string) => {
	try {
		const deletedUser = await prisma.user.delete({ where: { id: id } });
		return deletedUser;
	} catch (error) {
		return json({ error });
	}
};
