import { type SEOHandle } from '@nasa-gcn/remix-seo'
import { Link } from '@remix-run/react'

export const handle: SEOHandle = {
	getSitemapEntries: () => null,
}

export default function Admin() {
	return (
		<div>
			<h1>Admin</h1>
			<p>This is the admin page.</p>

			<div className="flex flex-col">
				<Link to="fragments">Add or update fragments</Link>
				<Link to="cache">Inspect cache</Link>
			</div>
		</div>
	)
}
