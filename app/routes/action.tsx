// TYPE
import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
	return {
		content: { name: 'robots', content: 'noindex, nofollow' },
	};
};

export default function noop() {
	return null;
}
