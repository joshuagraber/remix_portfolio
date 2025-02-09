import { invariantResponse } from '@epic-web/invariant'
import { type LoaderFunctionArgs } from '@remix-run/node'
import { type MetaFunction, useLoaderData } from '@remix-run/react'
import { getMDXComponent } from 'mdx-bundler/client'
import { useMemo } from 'react'
import { mdxComponents } from '#app/components/mdx/index.tsx'
import { prisma } from '#app/utils/db.server'
import { compileMDX } from '#app/utils/mdx.server'
import { Time } from './__time'

export async function loader({ params }: LoaderFunctionArgs) {
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

	return { post, code, frontmatter }
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	if (!data?.post) {
		return [
			{ title: 'Fragment Not Found | Joshua D. Graber' },
			{ description: 'No fragment found' },
		]
	}

	const { post } = data
	return [
		{ title: `${post.title} | Joshua D. Graber` },
		{
			name: 'description',
			content: post.description || `Fragment: ${post.title}`,
		},
		{ property: 'og:title', content: post.title },
		{
			property: 'og:description',
			content: post.description || `Fragment: ${post.title}`,
		},
		{ property: 'og:type', content: 'article' },
		{ property: 'og:image', content: '/img/primary.png' },
		{
			property: 'og:url',
			content: `https://joshuagraber.com/fragments/${post.slug}`,
		},
	]
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
