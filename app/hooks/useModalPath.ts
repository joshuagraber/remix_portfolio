// GLOBALS
import { useLocation } from '@remix-run/react';

export const useContactModalOpen = () => {
	const location = useLocation();

	return `${location.pathname}?contact=open`;
};

export const useContactModalClose = () => {
	const location = useLocation();

	return location.pathname;
};
