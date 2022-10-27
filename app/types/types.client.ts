import type { DynamicLinksFunction } from 'remix-utils';

// Route stuff
export interface Handle {
	animatePresence: boolean;
	dynamicLinks: DynamicLinksFunction<any>;
	ref: React.RefObject<unknown>;
}