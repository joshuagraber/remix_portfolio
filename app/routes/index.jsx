// COMPONENTS
import { ContainerCenter, links as containerCenterLinks } from '~/components/ContainerCenter';
import { Layout, links as layoutLinks } from '~/components/Layout';

export function links() {
	return [...containerCenterLinks(), ...layoutLinks()];
}

export default function Index() {
	return (
		<Layout>
			<ContainerCenter>Hello from the Home Page</ContainerCenter>
		</Layout>
	);
}
