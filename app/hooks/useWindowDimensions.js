import { useState, useEffect } from 'react';
import { getWindow } from 'ssr-window';

function getWindowDimensions() {
	const { innerWidth, innerHeight } = getWindow();
	return {
		innerWidth,
		innerHeight,
	};
}

export function useWindowDimensions() {
	const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return windowDimensions;
}
