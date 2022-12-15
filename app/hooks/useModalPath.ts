// GLOBALS
import { useLocation } from '@remix-run/react';

export const useToggleContactModal = () => {
	const location = useLocation();

	return { close: location.pathname, open: `${location.pathname}?contact` };
};
