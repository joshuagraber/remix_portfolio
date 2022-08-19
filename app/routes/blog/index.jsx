// COMPONENTS
import { ContainerCenter, links as containerCenterLinks } from '~/components/ContainerCenter';
import { Layout, links as layoutLinks } from '~/components/Layout';

export function links() {
	return [...containerCenterLinks(), ...layoutLinks()];
}

export default function Blog() {
	return (
		<Layout>
			<ContainerCenter>
				<div>Hello from Blog page!</div>;
			</ContainerCenter>
		</Layout>
	);
}
