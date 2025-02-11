'use client'

import React, { useEffect, useState } from 'react'
import { Icon } from '../ui/icon'

export const YouTubeEmbed = ({ id }: { id: string }) => {
	const [isLoading, setIsLoading] = React.useState(true)
	const [hasMounted, setHasMounted] = useState(false)

	useEffect(() => {
		setHasMounted(true)
	}, [])

	// Separate return for pre-hydration
	if (!hasMounted) {
		return <YouTubeLoading />
	}

	return (
		<div className="relative my-2 aspect-video md:my-4">
			{isLoading && <YouTubeLoading />}
			<iframe
				rel="preload"
				className="aspect-video w-full"
				src={`https://www.youtube.com/embed/${id}?origin=${window.location.origin}`}
				title="YouTube video player"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
				onLoad={() => setIsLoading(false)}
			/>
		</div>
	)
}

function YouTubeLoading() {
	return (
		<div className="absolute inset-0 flex items-center justify-center bg-secondary dark:bg-primary-foreground">
			<div className="flex animate-pulse space-x-4">
				<Icon
					className="h-16 w-16 text-secondary-foreground dark:text-primary"
					name="dots-horizontal"
				/>
			</div>
		</div>
	)
}
