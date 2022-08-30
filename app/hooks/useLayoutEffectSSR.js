import React from 'react';

const canUseDOM = !!(
	typeof window !== 'undefined' &&
	window.document &&
	window.document.createElement
);

// "Custom hook" for SSR
export const useLayoutEffect = canUseDOM ? React.useLayoutEffect : () => {};
