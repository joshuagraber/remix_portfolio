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

export const Portal: React.FC<Props> = ({ className = '', children, id = '', tabIndex = 0 }) => {
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

		if (portal) {
			root?.appendChild(portal);
		}

		return () => {
			if (portal) {
				root?.removeChild(portal);
			}
		};
	}, [portal, root]);

	// Vars
	if (portal) {
		portal.setAttribute('key', className);
		portal.className += className;
		portal.id = id;
	}

	if (!root || !portal) {
		return null;
	}

	return createPortal(children, portal);
};
