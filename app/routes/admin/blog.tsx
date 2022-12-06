// GLOBALS
import React from 'react';
import {
	useFetcher,
	useFormAction,
	useLoaderData,
	useLocation,
	useParams,
	useSearchParams,
	useSubmit,
} from '@remix-run/react';
import { json, redirect } from '@remix-run/node';

// COMPONENTS
import { Input } from 'components/Input';
import { Button } from 'components/Button';

// SERVICES
import * as blog from 'services/blog.server';
import * as media from 'services/media.server';
import * as users from 'services/users.server';

// UTILS
import { titleCase } from 'utils/utils';

// TYPES
import { AdminActions } from 'types/types';
import type { LoaderFunction } from '@remix-run/node';
import type { Post, User } from '@prisma/client';
import type { ResourceApiResponse } from 'cloudinary';

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

export default function BlogAdmin() {
	// HOOKS - GLOBAL
	const blogFetcher = useFetcher();
	const loaderData = useLoaderData();
	const { action } = useParams();
	const deleteAction = useFormAction(AdminActions.DELETE);
	const [searchParams, setSearchParams] = useSearchParams();
	const submit = useSubmit();
	const { pathname, search } = useLocation();

	// HOOKS - STATE
	const [authors, setAuthors] = React.useState<User[]>(loaderData?.authors);
	const [errors, setErrors] = React.useState(blogFetcher?.data?.errors);
	const [errorMessage, setErrorMessage] = React.useState(
		blogFetcher?.data?.errors?.form ?? blogFetcher?.data?.message
	);
	const [fields, setFields] = React.useState(blogFetcher?.data?.fields);
	const [images, setImages] = React.useState<ResourceApiResponse['resources']>(loaderData?.images);
	const [posts, setPosts] = React.useState<Post[]>(loaderData?.posts);
	const [postUpdated, setPostUpdated] = React.useState<Post>(blogFetcher?.data?.postUpdated);
	const [selectedPost, setSelectedPost] = React.useState<Post | undefined>(undefined);

	// HOOKS = EFFECTS
	// On fetcher change
	React.useEffect(() => {
		setErrors(blogFetcher?.data?.errors);
		setErrorMessage(blogFetcher?.data?.errors?.form ?? blogFetcher?.data?.message);
		setFields(blogFetcher?.data?.fields);
		setPostUpdated(blogFetcher?.data?.postUpdated);
	}, [blogFetcher?.data]);

	// On action change
	React.useEffect(() => {
		if (errors && blogFetcher?.data) {
			setErrors(undefined);
		}

		if (fields) {
			setFields(undefined);
		}
	}, [action]);

	// On loader update
	React.useEffect(() => {
		setAuthors(loaderData?.authors);
		setPosts(loaderData?.posts);
		setImages(loaderData?.images);
	}, [loaderData]);

	// On select blog post change
	React.useEffect(() => {
		setFields(selectedPost);
	}, [selectedPost]);

	// HANDLERS
	function handleOnFormChange(event: React.ChangeEvent<HTMLFormElement>) {
		submit(event.currentTarget, { method: 'get', replace: true });
	}

	function handleOnSelectPost(event: React.ChangeEvent<HTMLSelectElement>) {
		const post = posts.find((post) => post.id === event?.target?.value);
		setSelectedPost(post);
		submit({ author_id: String(selectedPost?.author_id) }, { method: 'get', replace: true });
	}

	function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
		const deleteButton = event?.currentTarget.querySelector(
			'button[formaction="/admin/blog/delete"]'
		);
		const nativeEvent = event.nativeEvent as unknown as SubmitEvent;

		if (nativeEvent?.submitter === deleteButton) {
			return !confirm('Are you sure?') ? event.preventDefault() : true;
		}
	}

	// VARS
	const actionDisplay = `${titleCase(action)} Post`;
	// Normalize string for client
	const contentDefault = fields?.content ? String(fields.content).replace(/\\n/g, '\n') : '';
	// Get params
	const selectedPostAuthorIDDefault = selectedPost?.author_id ?? searchParams.get('author_id');
	const selectedPostImages = searchParams.getAll('images');
	const selectedPostPublishedAt = searchParams.get('published_at');
	const selectedPostPublishedAtDefaultValue = selectedPostPublishedAt
		? selectedPostPublishedAt
		: selectedPost?.published_at
		? new Date(selectedPost?.published_at).toISOString()
		: '';

	// RENDER
	return (
		<blogFetcher.Form
			action={action}
			className='jdg-admin-form jdg-admin-form-blog'
			method='put'
			onChange={handleOnFormChange}
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
						defaultValue='select_post_instruction'
						id='select_post'
						name='select_post'
						onChange={handleOnSelectPost}
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

			{React.useMemo(() => {
				return (
					<>
						{/* title (text input) */}
						<Input
							defaultValue={fields?.title}
							error={errors?.title}
							label='Title'
							name='title'
							type='text'
						/>

						{/* tagline (text input) */}
						<Input
							defaultValue={fields?.tagline}
							error={errors?.tagline}
							label='Tagline'
							name='tagline'
							type='text'
						/>

						{/* Select Author */}
						{/* WHAT THE FUCK??? Form isn't accepting default value for this? */}
						{/* Might have to go with controlled component here */}
						<div className='jdg-input jdg-input-select'>
							<label htmlFor='author_id'>Select author of this post</label>
							<select
								name='author_id'
								id='author_id'
								defaultValue={selectedPostAuthorIDDefault ?? 'author_id_instruction'}
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
						<Input
							defaultValue={fields?.slug}
							error={errors?.slug}
							label='Slug'
							name='slug'
							type='text'
						/>

						{/* publishedAt (date-time input) */}
						<div className='jdg-input jdg-input-date'>
							<label htmlFor='published_at'>Post publishes on this date</label>
							<input
								// For whatever reason, date inputs only accept Years, Months, Days, Hours, and Minutes.
								// Slice off the rest of it.
								defaultValue={selectedPostPublishedAtDefaultValue.slice(0, -8)}
								id='published_at'
								name='published_at'
								type='datetime-local'
							/>
							{errors?.published_at && (
								<div className='jdg-error-message'>{errors.publshed_at}</div>
							)}
						</div>

						{/* content (textarea) */}
						<Input
							defaultValue={contentDefault}
							error={errors?.content}
							label='Content'
							name='content'
							type='textarea'
						/>

						{/* making controlled for now */}
						<div className='jdg-input jdg-input-select'>
							<label htmlFor='images'>Select images displayed in this post</label>
							<select defaultValue={selectedPostImages} id='images' name='images' multiple>
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
							<select name='image_featured' id='image_featured'>
								<option value='image_featured' disabled hidden>
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
							{errors?.image_featured && (
								<div className='jdg-error-message'>{errors.image_featured}</div>
							)}
						</div>

						{/* tags (text) */}
						<Input
							defaultValue={fields?.tags}
							error={errors?.tags}
							label='Tags'
							name='tags'
							type='text'
						/>
					</>
				);
			}, [action, fields, errors])}

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
