import { LinksFunction } from '@remix-run/node';
import { Input, links as inputLinks } from 'components/Input';

type FormValue = string | undefined;
interface ContactFormValues {
	[name_first: string]: FormValue;
	name_last: FormValue;
	email: FormValue;
	message: FormValue;
}
interface Props {
	errors?: ContactFormValues;
	fields?: ContactFormValues;
}

// EXPORTS
export const links: LinksFunction = () => {
	return [...inputLinks()];
};

export const ContactFormFields: React.FC<Props> = ({ errors, fields }) => {
	return (
		<div className='jdg-contact-form-input-fields'>
			<fieldset name='Name'>
				<Input
					error={errors?.name_first}
					label='First Name'
					name='name_first'
					placeholder='Jane'
					type='text'
					defaultValue={fields?.name_first}
				/>
				<Input
					error={errors?.name_last}
					label='Last Name'
					name='name_last'
					placeholder='Doe'
					type='text'
					defaultValue={fields?.name_last}
				/>
			</fieldset>
			<Input
				error={errors?.email}
				label='Email'
				name='email'
				placeholder='jane@doe.com'
				type='text'
				defaultValue={fields?.email}
			/>
			<Input
				error={errors?.message}
				label='Your Message'
				name='message'
				placeholder='What would you like to say...'
				type='textarea'
				defaultValue={fields?.message}
			></Input>
		</div>
	);
};
