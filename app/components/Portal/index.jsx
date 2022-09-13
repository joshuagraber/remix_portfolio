// GLOBALS
import React from 'react';
import { createPortal } from 'react-dom';

// Hooks
import { canUseDOM } from '../../utils/utils';

export const Portal = ({ className, children }) => {
	// HOOKS - STATE
	const [root, setRoot] = React.useState(null);
	const [portal, setPortal] = React.useState(null);

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

		root?.appendChild(portal);

		return () => {
			root?.removeChild(portal);
		};
	}, [portal, root]);

	if (!portal || !root) {
		return null;
	}

	portal.className = className;
	portal.key = className;
	return createPortal(children, portal);
};
