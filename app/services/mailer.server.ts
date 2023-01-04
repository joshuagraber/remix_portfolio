// GLOBALS
import type { SendMailOptions, Transporter } from 'nodemailer';
import nodemailer from 'nodemailer';

// NODEMAILER
// UTIL
async function getConfig() {
	switch (process.env.NODE_ENV) {
		// DEVELOPMENT
		case 'development':
			const {
				smtp: { host, port, secure },
				user,
				pass,
			} = await nodemailer.createTestAccount();

			// Log credentials to expose ethereal login for viewing email
			console.log(
				`
	**** Nodemailer test account created **** \n
	Log in to https://ethereal.email/login with the following credentials to view sent mail:
	USERNAME: ${user}
	PASSWORD: ${pass}
	`
			);

			return { auth: { user, pass }, host, port, secure };

		// PRODUCTION
		default:
			return {
				auth: {
					user: process.env.SMTP_USER,
					pass: process.env.SMTP_PASSWORD,
				},
				host: process.env.SMTP_HOST,
				port: Number(process.env.SMTP_PORT),
				requireTLS: true,
				secure: true,
			};
	}
}

// EXPORT
export const sendMail = async (options: SendMailOptions): Promise<any> => {
	const transporter: Transporter = nodemailer.createTransport(await getConfig());
	return transporter.sendMail(options);
};
