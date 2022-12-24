// GLOBALS
import React from 'react';
import { useFetcher, useFormAction, useLoaderData, useParams, useSubmit } from '@remix-run/react';
import { json, redirect } from '@remix-run/node';

// COMPONENTS
import { Button } from 'components/Button';

// SERVICES
import * as blog from 'services/blog.server';
import * as media from 'services/media.server';
import * as users from 'services/users.server';

// UTILS
import { titleCase } from 'utils/utils';

// TYPES
import { AdminActions } from 'types/types';
import type { BlogFormValues } from 'types/types.server';
import type { LoaderFunction } from '@remix-run/node';
import type { Post, User } from '@prisma/client';
import type { ResourceApiResponse } from 'cloudinary';

// CONSTANTS
const INITIAL_FORM_STATE: BlogFormValues = {
	author_id: 'author_id_instruction',
	content: '',
	images: [],
	image_featured: 'image_featured_instruction',
	slug: '',
	tagline: '',
	tags: [],
	title: '',
	published_at: '',
	select_post: 'select_post_instruction',
};

// EXPORTS
export const loader: LoaderFunction = async ({ params }) => {
	if (!params.action) {
		return redirect('/admin/blog/update');
	}

	try {
		const authors = await users.getUsersAreBlogAuthors();
		const images = await media.getImagesAll();
		const posts = await blog.getPostsAll();

		return json({ authors, images: images.resources, posts }, { status: 200 });
	} catch (error) {
		return json(error);
	}
};

// TODO: intermittently store form values in session storage (or just create incomplete records,
// using toggle for is_complete on submit, which actually is an update call?, or something like that?)
// to ensure persistence if browser tab unfocused, etc.
export default function BlogAdmin() {
	// HOOKS - GLOBAL
	const blogFetcher = useFetcher();
	const loaderData = useLoaderData();
	const { action } = useParams();
	const deleteAction = useFormAction(AdminActions.DELETE);
	const submit = useSubmit();

	// HOOKS - STATE
	const [authors, setAuthors] = React.useState<User[]>(loaderData?.authors);
	const [errors, setErrors] = React.useState(blogFetcher?.data?.errors);
	const [errorMessage, setErrorMessage] = React.useState(
		blogFetcher?.data?.errors?.form ?? blogFetcher?.data?.message
	);
	const [fields, setFields] = React.useState(INITIAL_FORM_STATE);
	const [images, setImages] = React.useState<ResourceApiResponse['resources']>(loaderData?.images);
	const [posts, setPosts] = React.useState<Post[]>(loaderData?.posts);
	const [postUpdated, setPostUpdated] = React.useState<Post>(blogFetcher?.data?.postUpdated);

	// HOOKS = EFFECTS
	// On fetcher change
	React.useEffect(() => {
		if (blogFetcher?.data) {
			setErrors(blogFetcher?.data?.errors);
			setErrorMessage(blogFetcher?.data?.errors?.form ?? blogFetcher?.data?.message);
			setPostUpdated(blogFetcher?.data?.postUpdated);
		}

		if (blogFetcher?.data?.fields) {
			setFields({
				...blogFetcher?.data?.fields,
				// For first value coming from DB, need to replace line breaks
				content: blogFetcher?.data?.fields?.content?.replace(/\\n/g, '\n'),
			});
		}
	}, [blogFetcher?.data]);

	// On action change
	React.useEffect(() => {
		if (errors && blogFetcher?.data) {
			setErrors(undefined);
		}

		if (fields) {
			setFields(INITIAL_FORM_STATE);
		}
	}, [action]);

	// On loader update
	React.useEffect(() => {
		setAuthors(loaderData?.authors);
		setPosts(loaderData?.posts);
		setImages(loaderData?.images);
	}, [loaderData]);

	// UTIL
	function normalizeDateForDateTimeInput(dateString: string) {
		// For whatever reason, date inputs only accept Years, Months, Days, Hours, and Minutes.
		// Slice off the rest of it.
		return new Date(dateString).toLocaleString().slice(0, -8);
	}

	// HANDLERS
	function handleOnInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		preventDefaults(event);
		const { name, value } = event?.currentTarget;

		setFields((previousFields) => {
			return { ...previousFields, [name]: value };
		});
	}

	function handleOnTextAreaChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
		preventDefaults(event);
		const { name, value } = event?.currentTarget;

		setFields((previousFields) => {
			return { ...previousFields, [name]: value };
		});
	}

	function handleOnSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
		preventDefaults(event);
		const { name, value } = event?.currentTarget;

		// Handling images in handleOnImagesSelectClick
		if (name === 'images') return;

		setFields((previousFields) => {
			return { ...previousFields, [name]: value };
		});
	}

	function handleOnImagesSelectClick(event: React.MouseEvent<HTMLSelectElement>) {
		preventDefaults(event);

		const { value } = event.nativeEvent.target as unknown as HTMLOptionElement;

		setFields((previousFields) => {
			if (previousFields.images.includes(value)) {
				return { ...previousFields, images: previousFields.images.filter((img) => img !== value) };
			}
			return { ...previousFields, images: [...previousFields.images, value] };
		});
	}

	function handleOnSelectPost(event: React.ChangeEvent<HTMLSelectElement>) {
		preventDefaults(event);
		// TODO: refactor this to use another param in the loader to return selected post and set to fields state
		blogFetcher.submit({ action: '/blog/update', method: 'get' });
		const post = posts.find((post) => post.id === event?.target?.value);

		if (post) {
			setFields({
				...post,
				published_at: normalizeDateForDateTimeInput(post.published_at.toLocaleString()),
				select_post: event.target.value,
			});
		}
	}

	function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
		const deleteButton = event?.currentTarget.querySelector(
			'button[formaction="/admin/blog/delete"]'
		);
		const nativeEvent = event.nativeEvent as unknown as SubmitEvent;

		if (nativeEvent?.submitter === deleteButton) {
			return !confirm('Are you sure?') ? event.preventDefault() : true;
		}
		return true;
	}

	function preventDefaults(e: any) {
		e.preventDefault();
		e.stopPropagation();
	}

	// VARS
	const actionDisplay = `${titleCase(action)} Post`;

	// RENDER
	return (
		<blogFetcher.Form
			action={action}
			className='jdg-admin-form jdg-admin-form-blog'
			method='put'
			onSubmit={handleOnSubmit}
		>
			<h3>{actionDisplay}</h3>

			{/* Status updated divs */}
			{errorMessage && <div className='jdg-admin-error-message'>{errorMessage}</div>}
			{postUpdated && (
				<div className='jdg-admin-update-message'>Blog post "{postUpdated.title}" was updated.</div>
			)}

			{/* selected_post Select box for all posts, only on update action */}
			{action !== AdminActions.CREATE && posts && (
				<div className='jdg-input jdg-input-select'>
					<label htmlFor='select_post'>Select a post to update</label>
					<select
						id='select_post'
						name='select_post'
						onChange={handleOnSelectPost}
						value={fields.select_post}
					>
						<option value='select_post_instruction' disabled>
							Select a post to update
						</option>
						{posts.map((post) => {
							return (
								<option key={post.id} value={post.id}>
									{post.title}
								</option>
							);
						})}
					</select>
					{errors?.select_post && <div className='jdg-error-message'>{errors.select_post}</div>}
				</div>
			)}

			{/* title (text input) */}
			<div className='jdg-input jdg-input-text'>
				<label htmlFor='title'>Title</label>
				<input name='title' onChange={handleOnInputChange} type='text' value={fields.title} />
				{errors?.title && <div className='jdg-error-message'>{errors.title}</div>}
			</div>

			{/* tagline (text input) */}
			<div className='jdg-input jdg-input-text'>
				<label htmlFor='tagline'>Tagline</label>
				<input name='tagline' onChange={handleOnInputChange} type='text' value={fields.tagline} />
				{errors?.tagline && <div className='jdg-error-message'>{errors.tagline}</div>}
			</div>

			{/* Select Author */}
			<div className='jdg-input jdg-input-select'>
				<label htmlFor='author_id'>Select author of this post</label>
				<select
					name='author_id'
					onChange={handleOnSelectChange}
					id='author_id'
					value={fields.author_id ?? 'author_id_instruction'}
				>
					<option value='author_id_instruction' disabled hidden>
						Select post author
					</option>
					{authors.map((author) => {
						return (
							<option key={author.id} value={author.id}>
								{titleCase(`${author.name_first} ${author.name_last}`)}
							</option>
						);
					})}
				</select>
				{errors?.author_id && <div className='jdg-error-message'>{errors.author_id}</div>}
			</div>

			{/* slug (text input) */}
			<div className='jdg-input jdg-input-text'>
				<label htmlFor='slug'>Slug</label>
				<input value={fields.slug} name='slug' onChange={handleOnInputChange} type='text' />
				{errors?.slug && <div className='jdg-error-message'>{errors.slug}</div>}
			</div>

			{/* publishedAt (date-time input) */}
			<div className='jdg-input jdg-input-date'>
				<label htmlFor='published_at'>Post publishes on this date</label>
				<input
					id='published_at'
					name='published_at'
					onChange={handleOnInputChange}
					type='datetime-local'
					value={fields.published_at}
				/>
				{errors?.published_at && <div className='jdg-error-message'>{errors.publshed_at}</div>}
			</div>

			{/* content (textarea) */}
			<div className='jdg-input jdg-input-textarea'>
				<label htmlFor='content'>Content</label>
				<textarea name='content' onChange={handleOnTextAreaChange} value={fields.content} />
				{errors?.content && <div className='jdg-error-message'>{errors.content}</div>}
			</div>

			{/* making controlled for now */}
			<div className='jdg-input jdg-input-select'>
				<label htmlFor='images'>Select images displayed in this post</label>
				<select
					value={[...fields.images]}
					id='images'
					name='images'
					onChange={handleOnSelectChange}
					onClick={handleOnImagesSelectClick}
					multiple
				>
					{images.map((image) => {
						return (
							<option key={image.secure_url} value={image.secure_url}>
								{image.tags.join(', ')}
							</option>
						);
					})}
				</select>
				{errors?.images && <div className='jdg-error-message'>{errors.images}</div>}
			</div>

			{/* image_featured (Select menu (all images, single)) */}
			<div className='jdg-input jdg-input-select'>
				<label htmlFor='image_featured'>Select this post's featured image</label>
				<select
					name='image_featured'
					id='image_featured'
					onChange={handleOnSelectChange}
					value={fields.image_featured}
				>
					<option value='image_featured_instruction' disabled hidden>
						Select featured post image
					</option>
					{images.map((image) => {
						return (
							<option key={image.secure_url} value={image.secure_url}>
								{image.tags.join(', ')}
							</option>
						);
					})}
				</select>
				{errors?.image_featured && <div className='jdg-error-message'>{errors.image_featured}</div>}
			</div>

			{/* tags (text) */}
			<div className='jdg-input jdg-input-text'>
				<label htmlFor='tags'>Tags</label>
				<input
					value={Array.isArray(fields.tags) ? fields.tags.join(', ') : fields.tags}
					name='tags'
					onChange={handleOnInputChange}
					type='text'
				/>
				{errors?.tags && <div className='jdg-error-message'>{errors.tags}</div>}
			</div>

			{/* Submit */}
			<Button type='submit'>{actionDisplay}</Button>

			{action !== AdminActions.CREATE && (
				<>
					<h3>Delete Post</h3>
					<Button formAction={deleteAction} type='submit'>
						Delete Post
					</Button>
				</>
			)}
		</blogFetcher.Form>
	);
}

export { CatchBoundary, ErrorBoundary } from 'components/Boundaries';
