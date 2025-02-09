import { invariantResponse } from '@epic-web/invariant'
import { getMDXComponent } from 'mdx-bundler/client'
import { useMemo } from 'react'
import {
	type LoaderFunctionArgs,
	type MetaFunction,
	useLoaderData,
} from 'react-router'
import { mdxComponents } from '#app/components/mdx/index.tsx'
import { prisma } from '#app/utils/db.server'
import { compileMDX } from '#app/utils/mdx.server'
import { mergeMeta } from '#app/utils/merge-meta.ts'
import { Time } from './__time'

export async function loader({ params, request }: LoaderFunctionArgs) {
	const url = new URL(request.url)
	const post = await prisma.post.findUnique({
		where: {
			slug: params.slug,
			publishAt: { not: null },
		},
		select: {
			content: true,
			publishAt: true,
			title: true,
			description: true,
			slug: true,
		},
	})

	invariantResponse(post, 'Not found', { status: 404 })

	const { code, frontmatter } = await compileMDX(post.content)

	return { post, code, frontmatter, ogURL: url }
}

export const meta: MetaFunction<typeof loader> = ({ data, matches }) => {
	const parentMeta = matches[matches.length - 2]?.meta ?? []

	if (!data?.post) {
		return mergeMeta(parentMeta, [
			{ title: 'Fragment Not Found | Joshua D. Graber' },
			{ description: 'No fragment found' },
		])
	}

	const { post } = data

	return mergeMeta(parentMeta, [
		{ title: `${post.title} | Joshua D. Graber` },
		{
			name: 'description',
			property: 'description',
			content: `Fragment: ${post.title}${post.description ? ', ' + post.description : ''}`,
		},
		{ property: 'og:title', name: 'og:title', content: post.title },
		{
			property: 'og:description',
			name: 'og:description',
			content: `Fragment: ${post.title}${post.description ? ', ' + post.description : ''}`,
		},
		{ property: 'og:type', name: 'og:type', content: 'article' },
		{
			property: 'og:url',
			name: 'og:url',
			content: data?.ogURL.toString(),
		},
	])
}

export default function Fragment() {
	const { post, code, frontmatter } = useLoaderData<typeof loader>()
	const Component = useMemo(() => getMDXComponent(code), [code])

	return (
		<div className="jdg_typography mx-auto w-full max-w-screen-md p-8">
			<h1 className="mb-4">{frontmatter.title}</h1>
			<p>{frontmatter.description}</p>
			<p className="text-sm text-neutral-500">
				{/* Non-null assertion okay here. If the post is returned here, that means it's published */}
				<Time time={post.publishAt!.toDateString()} />
			</p>
			<div>
				<Component components={mdxComponents} />
			</div>
		</div>
	)
}
