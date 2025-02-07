import React from 'react'
import { Icon } from '../ui/icon'

export const YouTubeEmbed = ({ id }: { id: string }) => {
	const [isLoading, setIsLoading] = React.useState(true)

	return (
		<div className="relative my-2 aspect-video md:my-4">
			{isLoading && (
				<div className="absolute inset-0 flex items-center justify-center bg-secondary dark:bg-primary-foreground">
					<div className="flex animate-pulse space-x-4">
						<Icon
							className="h-16 w-16 text-secondary-foreground dark:text-primary"
							name="dots-horizontal"
						/>
						<div className="flex-1 space-y-4 py-1">
							<div className="h-4 w-3/4 rounded bg-gray-300"></div>
							<div className="space-y-2">
								<div className="h-4 rounded bg-gray-300"></div>
								<div className="h-4 w-5/6 rounded bg-gray-300"></div>
							</div>
						</div>
					</div>
				</div>
			)}
			<iframe
				className="aspect-video w-full"
				src={`https://www.youtube.com/embed/${id}`}
				title="YouTube video player"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
				onLoad={() => setIsLoading(false)}
			/>
		</div>
	)
}
