import type { DynamicLinksFunction } from 'remix-utils';

// Route stuff
export interface Handle {
	animatePresence: boolean;
	dynamicLinks: DynamicLinksFunction<any>;
	ref: React.RefObject<unknown>;
}

export enum SignInActions {
	SIGNIN = 'in',
	SIGNOUT = 'out',
	SIGNUP = 'up',
}

export enum AdminActions {
	CREATE = 'create',
	DELETE = 'delete',
	UPDATE = 'update',
}
