import React from 'react';

// Util
import { useLayoutEffect } from 'hooks/useLayoutEffectSSR';

export function useIsFirstTimeVisitor() {
	const [isFirstTimeVisitor, setIsFirstTimeVisitor] = React.useState<boolean | undefined>(
		undefined
	);

	let localStorageHasVisited: boolean | string | null = null;

	if (typeof localStorage !== 'undefined') {
		localStorageHasVisited = localStorage.getItem('has_visited');
	}

	useLayoutEffect(() => {
		if (localStorageHasVisited) {
			setIsFirstTimeVisitor(false);
			return;
		}
		setIsFirstTimeVisitor(true);
	}, []);

	React.useEffect(() => {
		localStorage.setItem('has_visited', 'true');
	});

	return { isFirstTimeVisitor };
}
