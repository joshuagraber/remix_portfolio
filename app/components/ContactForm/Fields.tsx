import { LinksFunction } from '@remix-run/node';
import { Input, links as inputLinks } from 'components/Input';

import { RouteActionDataSelf } from 'types/types.server';

// EXPORTS
export const links: LinksFunction = () => {
	return [...inputLinks()];
};

export const ContactFormFields: React.FC<RouteActionDataSelf> = ({ data }) => {
	return (
		<div className='jdg-contact-form-input-fields'>
			<fieldset name='Name'>
				<Input
					error={data?.errors?.name_first}
					label='First Name'
					name='name_first'
					placeholder='Jamie'
					type='text'
					defaultValue={data?.fields?.name_first}
				/>
				<Input
					error={data?.errors?.name_last}
					label='Last Name'
					name='name_last'
					placeholder='Doe'
					type='text'
					defaultValue={data?.fields?.name_last}
				/>
			</fieldset>
			<Input
				error={data?.errors?.email}
				label='Email'
				name='email'
				placeholder='jamie@doe.com'
				type='text'
				defaultValue={data?.fields?.email}
			/>
			<Input
				error={data?.errors?.message}
				label='Your Message'
				name='message'
				placeholder='What would you like to say...'
				type='textarea'
				defaultValue={data?.fields?.message}
			></Input>
		</div>
	);
};
