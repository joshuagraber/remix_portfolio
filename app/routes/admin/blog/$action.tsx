export default function BlogPostUpdater() {
	return (
		<div>
			{/* Upload images (either action -- useFetcher for this) */}
			<div>
				<h3>Upload Images</h3>

				<h4>Images Uploaded</h4>
				{/* TODO: create component to display preview and url of image,
						keep all URLs in state array and use those to create component,
						map on each render to return. */}
			</div>

			{/* Create or update post (depending on action param) */}
			<div>
				<h3>Create Post</h3>
			</div>
		</div>
	);
}
