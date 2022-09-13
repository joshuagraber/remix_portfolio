// COMPONENTS
import { ContainerCenter, links as containerCenterLinks } from '~/components/ContainerCenter';

// EXPORTS
export function links() {
	return [...containerCenterLinks()];
}

export const meta = () => ({
	title: 'Joshua D. Graber | Blog',
});

export default function Blog() {
	return (
		<ContainerCenter>
			<div>Hello from Blog page!</div>;
		</ContainerCenter>
	);
}
