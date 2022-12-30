// GLOBALS
import type { SendMailOptions, Transporter } from 'nodemailer';
import nodemailer from 'nodemailer';
import { json } from '@remix-run/node';

// NODEMAILER
/* TODO: cache this? Each render makes two func calls
 * Since this func is called at top level scope with no checks.
 * Not big deal since server-side, but still good to tighten up. */
const transporter: Transporter = nodemailer.createTransport(getConfig());

function getConfig() {
	switch (process.env.NODE_ENV) {
		case 'development':
			nodemailer.createTestAccount((err, account) => {
				if (err) {
					return json(err);
				}

				return {
					auth: {
						user: account.user,
						pass: account.pass,
					},
					host: process.env.SMTP_HOST,
					port: Number(process.env.SMTP_PORT),
				};
			});
		default:
			return {
				auth: {
					user: process.env.SMTP_USER,
					pass: process.env.SMTP_PASSWORD,
				},
				host: process.env.SMTP_HOST,
				port: Number(process.env.SMTP_PORT),
				requireTLS: true,
				secure: false,
				tls: {
					ciphers: process.env.SMTP_CIPHERS,
				},
			};
	}
}

// EXPORT
export const sendMail = (options: SendMailOptions): Promise<any> => {
	return transporter.sendMail(options);
};
