// GLOBALS
import { json } from '@remix-run/node';
import { Link } from '@remix-run/react';
import React from 'react';
import styles from 'styles/index.css';

// COMPONENTS
import { Arrow } from 'components/SVG/Arrow';
import { ContainerCenter, links as containerCenterLinks } from 'components/ContainerCenter';

// HOOKS
import { useIsFirstTimeVisitor } from 'hooks/useIsFirstTimeVisitor';

// ASSETS
import headshot from 'assets/images/headshot-mock.png';
import clsx from 'clsx';

// TYPES
import type { ClassValue } from 'clsx';
import type { DynamicLinksFunction } from 'remix-utils';
import type { LoaderFunction, LinksFunction } from '@remix-run/node';
import type { Handle } from 'types/types';

// EXPORTS
export const loader: LoaderFunction = ({ request }) => {
	return json({
		canonical: request.url,
	});
};

export const dynamicLinks: DynamicLinksFunction = ({ data }) => {
	return [{ rel: 'canonical', href: data.canonical }];
};

export const links: LinksFunction = () => {
	return [...containerCenterLinks(), { rel: 'stylesheet', href: styles }];
};

export const handle: Handle = {
	animatePresence: false,
	dynamicLinks,
	ref: React.createRef(),
};

export default function Index(): React.ReactElement {
	// HOOKS - STATE
	const [textIsHidden, setTextIsHidden] = React.useState(true);
	const [imageIsHidden, setimageIsHidden] = React.useState(true);

	// HOOKS - CUSTOM
	const { isFirstTimeVisitor } = useIsFirstTimeVisitor();

	// HOOKS - EFFECTS
	React.useEffect(() => {
		if (typeof isFirstTimeVisitor === 'undefined') {
			return;
		}

		let timeout: NodeJS.Timeout | undefined = undefined;

		if (isFirstTimeVisitor) {
			timeout = setTimeout(() => {
				setimageIsHidden(false);
				setTextIsHidden(false);
			}, 1100); // Timeout should match CSS animation delay
		}

		if (!isFirstTimeVisitor) {
			setimageIsHidden(false);
			setTextIsHidden(false);
		}

		if (timeout) {
			return () => clearTimeout(timeout);
		}
	}, [isFirstTimeVisitor]);

	// VARS
	const firstTimeVisitorUnset = typeof isFirstTimeVisitor === 'undefined';

	// CLASSES
	// TODO: use CSSTransition in combination with this
	const classes: ClassValue = clsx('jdg-home-container-center', {
		'jdg-home-container-center-hide-text': textIsHidden,
		'jdg-home-container-center-hide-image': imageIsHidden,
		'jdg-home-container-center-no-animation': isFirstTimeVisitor === false,
		'jdg-home-container-center-show-animation': isFirstTimeVisitor,
	});

	return (
		<ContainerCenter className={classes}>
			{!firstTimeVisitorUnset && (
				<>
					<div className='jdg-home-image-container'>
						<figure className='jdg-home-image'>
							<img src={headshot} alt='Joshua D. Graber close-up headshot' />
							<figcaption>Photo by Jasmine!</figcaption>
						</figure>
					</div>
					<div className='jdg-home-text-container'>
						<h2>Writing</h2>
						<h2>Editing</h2>
						<h2>JavaScript development</h2>

						<Link prefetch='intent' to='work'>
							Learn more <Arrow direction='right' />
						</Link>
					</div>
				</>
			)}
		</ContainerCenter>
	);
}
