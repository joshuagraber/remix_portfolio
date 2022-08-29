// GLOBALS
import React from 'react';
import { Link } from '@remix-run/react';
import styles from './styles.css';

// COMPONENTS
import { Arrow } from '../components/SVG/Arrow';
import { ContainerCenter, links as containerCenterLinks } from '~/components/ContainerCenter';
import { Layout, links as layoutLinks } from '~/components/Layout';

// HOOKS
import { useTheme } from '~/theme';

// ASSETS
import headshot from '../assets/headshot-mock.png';
import clsx from 'clsx';

// EXPORTS
export function links() {
	return [...containerCenterLinks(), ...layoutLinks(), { rel: 'stylesheet', href: styles }];
}

export default function Index() {
	// HOOKS - STATE
	const [textIsHidden, setTextIsHidden] = React.useState(true);
	const [imageIsHidden, setimageIsHidden] = React.useState(true);

	// HOOKS - CUSTOM
	const { theme } = useTheme();

	// HOOKS - EFFECTS
	React.useEffect(() => {
		// TODO: Add LS check and hook to run the page load animation only once per user even on subsequent visits
		const timeout = setTimeout(() => {
			setimageIsHidden(false);
			setTextIsHidden(false);
		}, 2000);

		return () => {
			clearTimeout(timeout);
		};
	}, []);

	// VARS
	const arrowStroke = theme === 'jdg-light-mode' ? 'black' : 'white';

	// CLASSES
	const classes = clsx('jdg-home-container-center', {
		'jdg-home-container-center-hide-text': textIsHidden,
		'jdg-home-container-center-hide-image': imageIsHidden,
	});

	return (
		<Layout>
			<ContainerCenter className={classes}>
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

					<Link prefetch='intent' to='/about'>
						Learn more <Arrow stroke={arrowStroke} direction='right' />
					</Link>
				</div>
			</ContainerCenter>
		</Layout>
	);
}
