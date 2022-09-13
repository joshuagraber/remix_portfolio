// GLOBALS
import styles from './styles.css';

// COMPONENTS
import { ContainerCenter, links as containerCenterLinks } from '~/components/ContainerCenter';

// CONTEXT
import { useIsContactModalDisplayed } from '~/context';

// EXPORTS
export function links() {
	return [...containerCenterLinks(), { rel: 'stylesheet', href: styles }];
}

export const meta = () => ({
	title: 'Joshua D. Graber | Work',
});

export default function Work() {
	// HOOKS - CONTEXT
	const { setIsContactModalDisplayed } = useIsContactModalDisplayed();

	return (
		<>
			<ContainerCenter>
				<div onClick={() => setIsContactModalDisplayed(true)} role='button'>
					Open email modal
				</div>
			</ContainerCenter>
		</>
	);
}
