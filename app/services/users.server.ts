// GLOBALS
import { json } from '@remix-run/node';

// DB
import { prisma } from 'services/prisma.server';

// MISC
import bcrypt from 'bcrypt';

// TYPES
import type { UserFormValues } from 'types/types.server';
import { Role as UserRole, User } from '@prisma/client';

///////////////////// API
// CREATE
// TODO: Update RegisterFormValues type to include additional optional vals from admin form
export const createNewUser = async (formValues: UserFormValues) => {
	try {
		const hashedPassword = await bcrypt.hash(formValues.password, 10);
		const { email, name_first, name_middle, name_last } = formValues;

		return await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
				name_first,
				name_middle: name_middle ?? '',
				name_last,
			},
		});
	} catch (error) {
		throw json(error);
	}
};

// READ
export const getUsersAll = async () => {
	try {
		return await prisma.user.findMany();
	} catch (error) {
		throw json(error);
	}
};

export const getUsersByRole = async (role: UserRole) => {
	try {
		return await prisma.user.findMany({ where: { role } });
	} catch (error) {
		throw json(error);
	}
};

export const getUsersAreBlogAuthors = async () => {
	try {
		return await prisma.user.findMany({
			where: {
				OR: [{ role: UserRole.ADMIN }, { role: UserRole.COLLABORATOR }],
			},
		});
	} catch (error) {
		throw json(error);
	}
};

export const getUserByID = async (id: string) => {
	try {
		return await prisma.user.findUnique({ where: { id } });
	} catch (error) {
		throw json(error);
	}
};

// UPDATE
export const updateUserByID = async (id: string, formValues: Partial<UserFormValues>) => {
	const data = { ...formValues };

	if (data?.password) {
		data.password = await bcrypt.hash(data.password, 10);
	}

	try {
		const updatedUser = prisma.user.update({
			where: { id },
			data,
		});

		return updatedUser;
	} catch (error) {
		throw json({ errors: error, fields: { ...formValues, password: undefined } });
	}
};

// DELETE
export const deleteUserByID = async (id: string) => {
	try {
		const deletedUser = await prisma.user.delete({ where: { id } });
		return deletedUser;
	} catch (error) {
		throw json(error);
	}
};
