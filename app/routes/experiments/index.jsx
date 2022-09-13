/* 
This folder will use an index routing structure
for nested experiment routes
Instead of async, use exported array from /components/Experiments/index.jsx
Which will collect all experiments in the folder (hardcoding because they 
will be too complex and idiosyncratic to use a CDN)  
*/

// COMPONENTS
import { ContainerCenter, links as containerCenterLinks } from '~/components/ContainerCenter';

// EXPORTS
export function links() {
	return [...containerCenterLinks()];
}

export const meta = () => ({
	title: 'Joshua D. Graber | Experiments',
});

export default function Experiments() {
	return (
		<ContainerCenter>
			<div>Hello from Experiments page!</div>
		</ContainerCenter>
	);
}
