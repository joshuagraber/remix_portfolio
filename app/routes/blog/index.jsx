// Globals
import React from 'react';
import styles from '../../styles/index.css';

// COMPONENTS
import { ContainerCenter, links as containerCenterLinks } from '~/components/ContainerCenter';

// EXPORTS
export function links() {
	return [...containerCenterLinks(), { rel: 'stylesheet', href: styles }];
}

export function meta() {
	return {
		description: 'Blog posts on art, writing, technology, etcetera, by Joshua D. Graber',
		title: 'Joshua D. Graber | Blog',
	};
}

export function handle() {
	return { animatePresence: true, ref: React.createRef() };
}

export default function Blog() {
	return (
		<ContainerCenter className='jdg-blog-container-center'>
			<h2 className='jdg-blog-heading'>Blog stuff</h2>
			<p>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque minima tempore ipsum at
				nisi magnam error blanditiis, inventore architecto dolore ratione quidem? Dignissimos,
				necessitatibus labore. Impedit molestiae distinctio dolorum velit. Rerum sit soluta minima
				molestiae numquam magnam optio rem, sapiente dolorum. Maxime ipsam, in velit expedita
				asperiores, facere odio fugiat voluptatem reiciendis alias nesciunt commodi quas dolores
				nisi labore culpa! Id sint consectetur non rem a, reiciendis ab aliquam, deleniti maiores
				perspiciatis quaerat expedita velit totam, ullam recusandae incidunt fuga minima sed?
				Aliquid beatae eligendi quis laborum dignissimos harum aliquam!
			</p>
		</ContainerCenter>
	);
}
