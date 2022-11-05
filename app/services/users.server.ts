// GLOBALS
// DB
import { prisma } from 'services/prisma.server';

// MISC
import bcrypt from 'bcrypt';

// TYPES
import { RegisterFormValues } from 'types/types.server';

export const createNewUser = async (formValues: RegisterFormValues) => {
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
