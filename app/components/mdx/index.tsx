import { LinkPreview } from '../link-preview'
import { YouTubeEmbed } from './youtube'

type MDXComponents = {
	youtube: (props: { id: string }) => JSX.Element
	preview: (props: { url: string }) => JSX.Element
}

export const mdxComponents: MDXComponents = {
	// Directive components must match the directive name exactly
	youtube: ({ id }: { id: string }) => {
		return <YouTubeEmbed id={id} />
	},
	preview: ({ url }: { url: string }) => {
		return <LinkPreview url={url} />
	},
} as const
