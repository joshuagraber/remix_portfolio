export const ContactFormFieldset = () => (
	<fieldset className='jdg-contact-form-input-fields'>
		<legend>Say hello</legend>
		<label htmlFor='name'>Your Name</label>
		<input type='text' name='name' placeholder='Jamie Doe' />
		<label htmlFor='email'>Your Email</label>
		<input type='text' name='email' placeholder='jamie@email.com' />
		<label htmlFor='message'>Your message</label>
		<textarea name='message' placeholder='Type your message here' />
	</fieldset>
);
