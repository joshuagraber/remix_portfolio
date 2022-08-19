// COMPONENTS
import { ContainerCenter, links as containerCenterLinks } from '~/components/ContainerCenter';
import { Layout, links as layoutLinks } from '~/components/Layout';

export function links() {
	return [...containerCenterLinks(), ...layoutLinks()];
}

export default function Work() {
	return (
		<Layout>
			<ContainerCenter>
				<div>Hello from Work page!</div>
			</ContainerCenter>
		</Layout>
	);
}
