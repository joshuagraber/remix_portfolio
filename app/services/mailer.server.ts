// GLOBALS
import type { SendMailOptions, Transporter } from 'nodemailer';
import nodemailer from 'nodemailer';

// Nodemailer
const transporter: Transporter = getTransporter();

function getTransporter() {
	let config;

	switch (process.env.NODE_ENV) {
		case 'development':
			config = {
				auth: {
					user: process.env.SMTP_USER,
					pass: process.env.SMTP_PASSWORD,
				},
				host: process.env.SMTP_HOST,
				port: Number(process.env.SMTP_PORT),
			};
		default:
			config = {
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

	const transporter = nodemailer.createTransport(config);
	return transporter;
}
export const sendMail = (options: SendMailOptions): Promise<any> => {
	return transporter.sendMail(options);
};