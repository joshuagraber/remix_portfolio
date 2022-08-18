// GLOBALS
// import styles from './styles.css';

// COMPONENTS
import { ContainerCenter, links as containerCenterLinks } from '~/components/ContainerCenter';
import { Layout, links as layoutLinks } from '~/components/Layout';

export function links() {
	return [...layoutLinks()];
}

export default function About() {
	return (
		<Layout>
			<ContainerCenter>
				<div>Hello from About page!</div>
			</ContainerCenter>
		</Layout>
	);
}
