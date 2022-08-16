// COMPONENTS
import { Layout, links as layoutLinks } from '~/components/Layout';

export function links() {
	return [...layoutLinks()];
}

export default function Index() {
	return <Layout>Home Page</Layout>;
}
