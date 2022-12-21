import { RemixBrowser } from '@remix-run/react';
import { hydrateRoot } from 'react-dom/client';

// if the browser supports SW
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		// we will register it after the page complete the load
		navigator.serviceWorker.register('/assetCacheWorker.js');
	});
}

hydrateRoot(document, <RemixBrowser />);
