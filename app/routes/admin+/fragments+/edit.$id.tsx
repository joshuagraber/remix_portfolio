import {
	useForm,
	getFormProps,
	getInputProps,
	getTextareaProps,
} from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { invariantResponse } from '@epic-web/invariant'
import React, { type FormEvent, useEffect, useRef, useState } from 'react'
import { data, type ActionFunctionArgs, type LoaderFunctionArgs, Form, useActionData, useLoaderData, useNavigation  } from 'react-router';
import { type z } from 'zod'
import { Field, ErrorList } from '#app/components/forms'
import { MDXEditorComponent } from '#app/components/mdx/editor.tsx'
import { StatusButton } from '#app/components/ui/status-button'
import { requireUserId } from '#app/utils/auth.server'
import { prisma } from '#app/utils/db.server'
import {
	formatDateStringForPostDefault,
	formatContentForEditor,
} from '#app/utils/mdx.ts'
import { getPostImageSource } from '#app/utils/misc.tsx'
import { redirectWithToast } from '#app/utils/toast.server.ts'
import { PostImageManager } from './__image-manager'
import { PostSchemaUpdate as PostSchema } from './__types'
import { useImageUploader } from './__useImageUploader'

export async function loader({ params, request }: LoaderFunctionArgs) {
	await requireUserId(request)

	const [post, images] = await Promise.all([
		prisma.post.findUnique({
			where: { id: params.id },
			select: {
				id: true,
				title: true,
				content: true,
				description: true,
				slug: true,
				publishAt: true,
			},
		}),
		prisma.postImage.findMany({
			select: {
				id: true,
				altText: true,
				title: true,
			},
			orderBy: { createdAt: 'desc' },
		}),
	])

	invariantResponse(post, 'Not found', { status: 404 })
	invariantResponse(images, 'Error fetching images', { status: 404 })

	return { post, images }
	// return data({post: { title: '', description: '', publishAt: new Date().toLocaleDateString(), content: '', slug: '' }});
}

export async function action({ request, params }: ActionFunctionArgs) {
	await requireUserId(request)
	const formData = await request.formData()

	const submission = await parseWithZod(formData, {
		schema: PostSchema,
		async: true,
	})

	if (submission.status !== 'success') {
		return data(
			{ result: submission.reply() },
			{ status: submission.status === 'error' ? 400 : 200 },
		)
	}

	const { title, content, description, publishAt, slug } = submission.value

	try {
		await prisma.post.update({
			where: { id: params.id },
			data: {
				title,
				content,
				slug,
				description,
				publishAt,
			},
		})

		return redirectWithToast('/admin/fragments', {
			title: 'Post updated',
			description: `Post "${title}" updated successfully.`,
		})
	} catch {
		return data(
			{ result: submission.reply({ formErrors: ['Failed to update post'] }) },
			{ status: 500 },
		)
	}
}

export default function EditPost() {
	const { post, images } = useLoaderData<typeof loader>()
	const actionData = useActionData<typeof action>()
	const navigation = useNavigation()
	const isPending = navigation.state === 'submitting'

	const handleImageUpload = useImageUploader()

	const [form, fields] = useForm({
		id: 'edit-post-form',
		constraint: getZodConstraint(PostSchema),
		lastResult: actionData?.result,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: PostSchema })
		},
		shouldRevalidate: 'onBlur',
		defaultValue: {
			title: post.title,
			content: post.content,
			description: post.description,
			slug: post.slug,
			publishAt: formatDateStringForPostDefault(
				(post.publishAt ?? new Date()).toDateString(),
			),
		},
	})

	const [content, setContent] = useState(post.content)
	const [key, setKey] = useState('begin')
	const contentRef = useRef<HTMLTextAreaElement>(null)

	// Sync editor value with the hidden textarea
	useEffect(() => {
		if (contentRef.current) {
			contentRef.current.value = content
			contentRef.current.dispatchEvent(new Event('change'))
		}
	}, [content])

	return (
		<div className="p-8">
			<h1 className="mb-6 text-2xl font-bold">Edit Post</h1>

			<Form
				method="post"
				{...getFormProps(form)}
				className="space-y-6"
				onChange={(event: FormEvent) => {
					if (
						['description', 'title', 'publishAt', 'slug'].includes(
							// @ts-expect-error
							event.target.name,
						)
					) {
						const data = new FormData((event.target as HTMLFormElement).form)
						setContent(
							formatContentForEditor(
								Object.fromEntries(data.entries()) as unknown as z.infer<
									typeof PostSchema
								>,
							),
						)
						setKey(Math.random().toString())
					}
				}}
			>
				<Field
					labelProps={{
						htmlFor: fields.title.id,
						children: 'Title',
					}}
					inputProps={{
						...getInputProps(fields.title, { type: 'text' }),
					}}
					errors={fields.title.errors}
				/>
				<Field
					labelProps={{
						htmlFor: fields.description.id,
						children: 'Description',
					}}
					inputProps={{
						...getInputProps(fields.description, { type: 'text' }),
					}}
					errors={fields.description.errors}
				/>
				<Field
					labelProps={{
						htmlFor: fields.slug.id,
						children: 'Slug',
					}}
					inputProps={{
						...getInputProps(fields.slug, { type: 'text' }),
					}}
					errors={fields.slug.errors}
				/>
				<Field
					labelProps={{
						htmlFor: fields.publishAt.id,
						children: post.publishAt
							? 'This post is published. Would you like to update the publish date?'
							: 'This post is not yet published. When would you like to publish it?',
					}}
					inputProps={{
						...getInputProps(fields.publishAt, { type: 'date' }),
					}}
					errors={fields.publishAt.errors}
				/>

				<div>
					<label className="mb-1 block text-sm font-medium">Content</label>
					<div className="border">
						<MDXEditorComponent
							key={key}
							imageUploadHandler={handleImageUpload}
							images={images.map((image) => getPostImageSource(image.id))}
							markdown={content}
							onChange={setContent}
							diffSource={post.content}
						/>
					</div>
					<textarea
						ref={contentRef}
						{...getTextareaProps(fields.content)}
						className="hidden"
					/>
					{fields.content.errors ? (
						<div className="text-sm text-destructive">
							{fields.content.errors}
						</div>
					) : null}
				</div>

				<ErrorList errors={form.errors} id={form.errorId} />

				<div className="flex gap-4">
					<StatusButton
						type="submit"
						status={isPending ? 'pending' : (form.status ?? 'idle')}
						disabled={isPending}
						className="w-full"
					>
						Save Changes
					</StatusButton>
				</div>
			</Form>

			<h2>Manage post images</h2>
			<PostImageManager images={images} />
		</div>
	)
}
