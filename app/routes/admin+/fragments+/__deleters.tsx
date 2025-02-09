import React, { useState } from 'react'
import { useFetcher } from 'react-router';
import { toast } from 'sonner'
import { Button } from '#app/components/ui/button.tsx'
import { Icon } from '#app/components/ui/icon.tsx'
import { StatusButton } from '#app/components/ui/status-button.tsx'
import { type action as deletePostAction } from '#app/routes/admin+/fragments+/delete.tsx'
import { type action as deletePostImageAction } from '#app/routes/admin+/fragments+/images.delete.tsx'

export function DeletePost({ postId }: { postId: string }) {
	const [showConfirmation, setShowConfirmation] = useState(false)
	const deleteFetcher = useFetcher<typeof deletePostAction>()

	React.useEffect(() => {
		if (deleteFetcher.data) {
			toast.success(`Post "${deleteFetcher.data.title}" deleted successfully`)
		}
	}, [deleteFetcher])

	return (
		<deleteFetcher.Form method="POST" action="/admin/fragments/delete">
			{!showConfirmation && (
				<Button
					onClick={() => setShowConfirmation(true)}
					variant="destructive"
					type="button"
				>
					<Icon name="trash" /> Delete
				</Button>
			)}
			{showConfirmation && (
				<div className="flex flex-col items-end">
					<div className="flex gap-2">
						<StatusButton
							variant="destructive"
							type="submit"
							name="postId"
							value={postId}
							status={deleteFetcher.state === 'submitting' ? 'pending' : 'idle'}
						>
							<Icon name="trash" />
							Confirm
						</StatusButton>
						<Button
							variant="default"
							type="button"
							onClick={() => setShowConfirmation(false)}
						>
							No, cancel
						</Button>
					</div>
				</div>
			)}
		</deleteFetcher.Form>
	)
}

export function DeleteImage({ imageId }: { imageId: string }) {
	const [showConfirmation, setShowConfirmation] = useState(false)
	const deleteFetcher = useFetcher<typeof deletePostImageAction>()

	React.useEffect(() => {
		if (deleteFetcher.data) {
			toast.success(
				`Image with alt text "${'altText' in deleteFetcher.data ? deleteFetcher.data.altText : ''}" deleted successfully`,
			)
		}
	}, [deleteFetcher])

	return (
		<deleteFetcher.Form method="POST" action="/admin/fragments/images/delete">
			{!showConfirmation && (
				<Button
					onClick={() => setShowConfirmation(true)}
					variant="destructive"
					type="button"
					className="w-full"
				>
					<Icon name="trash" />
					Delete
				</Button>
			)}
			{showConfirmation && (
				<div className="flex items-center gap-4 [&>*]:flex-1">
					<StatusButton
						type="submit"
						size="icon"
						variant="destructive"
						name="imageId"
						value={imageId}
						status={deleteFetcher.state !== 'idle' ? 'pending' : 'idle'}
					>
						<Icon name="trash" /> Confirm
					</StatusButton>
					<Button
						variant="default"
						type="button"
						onClick={() => setShowConfirmation(false)}
					>
						No, cancel
					</Button>
				</div>
			)}
		</deleteFetcher.Form>
	)
}
