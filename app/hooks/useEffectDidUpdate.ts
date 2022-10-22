import React from 'react';

export function useEffectDidUpdate(fn: Function, deps: any[]) {
	const didMountRef = React.useRef(false);

	React.useEffect(() => {
		if (didMountRef.current) {
			return fn();
		}

		didMountRef.current = true;
	}, deps);
}
