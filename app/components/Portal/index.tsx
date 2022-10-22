// GLOBALS
import { createPortal } from 'react-dom';
import React from 'react';

// UTILS
import { canUseDOM } from 'utils/utils.client';

// TYPES
interface Props {
	className?: string;
	children: React.ReactElement | React.ReactNode;
	id?: string;
	tabIndex?: number;
}

export const Portal: React.FC<Props> = ({ className = '', children, id = '', tabIndex }) => {
	// HOOKS - STATE
	const [root, setRoot] = React.useState<Element | null>(null);
	const [portal, setPortal] = React.useState<Element | null>(null);

	// HOOKS - EFFECTS
	React.useEffect(() => {
		if (!canUseDOM) {
			return;
		}
		if (!root) {
			setRoot(document.querySelector('#app'));
		}
		if (!portal) {
			setPortal(document.createElement('div'));
		}

		if (!root || !portal) {
			throw new Error('Portal failed');
		}

		root?.appendChild(portal);

		return () => {
			root?.removeChild(portal);
		};
	}, [portal, root]);

	if (!portal || !root) {
		return null;
	}

	// Vars

	portal.setAttribute('key', className);
	portal.className += className;
	portal.id = id;

	return createPortal(children, portal);
};
