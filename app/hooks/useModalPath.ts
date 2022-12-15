// GLOBALS
import { useLocation } from '@remix-run/react';

// TODO: Do this from root loader instead?
export const useToggleContactModal = () => {
	const location = useLocation();

	return { close: location.pathname, open: `${location.pathname}?contact` };
};
