// GLOBALS
import { Link } from '@remix-run/react';
import styles from './styles.css';

// COMPONENTS
import { ContainerCenter, links as containerCenterLinks } from '~/components/ContainerCenter';
import { Layout, links as layoutLinks } from '~/components/Layout';

// ASSETS
import headshot from '../assets/headshot-mock.png';

export function links() {
	return [...containerCenterLinks(), ...layoutLinks(), { rel: 'stylesheet', href: styles }];
}

export default function Index() {
	return (
		<Layout>
			<ContainerCenter>
				<div className='jdg-home-image-container'>
					<figure className='jdg-home-image'>
						<img src={headshot} alt='Joshua D. Graber close-up headshot' />
						<figcaption>Photo by Grace Rosselli</figcaption>
					</figure>
				</div>
				<div className='jdg-home-text-container'>
					<h2>Writing</h2>
					<h2>Editing</h2>
					<h2>JavaScript development</h2>

					<Link to='/about'>Learn more {/* TODO: find arrow icon to use here */}</Link>
				</div>
			</ContainerCenter>
		</Layout>
	);
}
