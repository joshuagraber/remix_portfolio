import React from 'react';

export const canUseDOM = !!(
	typeof window !== 'undefined' &&
	window.document &&
	window.document.createElement
);

// "Custom hook" for SSR
export const useLayoutEffect = canUseDOM ? React.useLayoutEffect : () => {};
