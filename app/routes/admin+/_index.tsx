import { type SEOHandle } from '@nasa-gcn/remix-seo'
import { Link } from 'react-router'
import { requireUserId } from '#app/utils/auth.server.ts'

export async function loader({ request }: LoaderFunctionArgs) {
	await requireUserId(request)
}

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
