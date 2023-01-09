// GLOBALS
import { json } from '@remix-run/node';

// DB
import { prisma } from 'services/prisma.server';

// MISC
import bcrypt from 'bcrypt';

// TYPES
import type { SubscriberFormValues, UserFormValues } from 'types/types.server';
import { Role as UserRole } from '@prisma/client';

///////////////////// API
// CREATE
export const createNewSubscriber = async (formValues: SubscriberFormValues) => {
	try {
		return await prisma.subscriber.create({
			data: formValues,
		});
	} catch (error) {
		return json(error);
	}
};

export const createNewUser = async (formValues: UserFormValues) => {
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

// READ
export const getSubscribersAll = async () => {
	try {
		return await prisma.subscriber.findMany();
	} catch (error) {
		return json(error);
	}
};

export const getSubscriberByEmail = async (email: string) => {
	try {
		return await prisma.subscriber.findFirst({
			where: {
				email,
			},
		});
	} catch (error) {
		return json(error);
	}
};

export const getUsersAll = async () => {
	try {
		return await prisma.user.findMany();
	} catch (error) {
		return json(error);
	}
};

export const getUsersByRole = async (role: UserRole) => {
	try {
		return await prisma.user.findMany({ where: { role } });
	} catch (error) {
		return json(error);
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
		return json(error);
	}
};

export const getUserByID = async (id: string) => {
	try {
		return await prisma.user.findUnique({ where: { id } });
	} catch (error) {
		return json(error);
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
		return json({ errors: error, fields: { ...formValues, password: undefined } });
	}
};

// DELETE
export const deleteUserByID = async (id: string) => {
	try {
		const deletedUser = await prisma.user.delete({ where: { id } });
		return deletedUser;
	} catch (error) {
		return json(error);
	}
};
