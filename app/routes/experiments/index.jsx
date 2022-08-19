/* 
This folder will use an index routing structure
for nested experiment routes
Instead of async, use exported array from /components/Experiments/index.jsx
Which will collect all experiments in the folder (hardcoding because they 
will be too complex and idiosyncratic to use a CDN)  
*/

// COMPONENTS
import { ContainerCenter, links as containerCenterLinks } from '~/components/ContainerCenter';
import { Layout, links as layoutLinks } from '~/components/Layout';

export function links() {
	return [...containerCenterLinks(), ...layoutLinks()];
}

export default function Experiments() {
	return (
		<Layout>
			<ContainerCenter>
				<div>Hello from Experiments page!</div>
			</ContainerCenter>
		</Layout>
	);
}
