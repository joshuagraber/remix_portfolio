// GLOBALS
import React from 'react';
import styles from '../styles/index.css';

// COMPONENTS
import { Accordion, links as accordionLinks } from '../components/Accordion';
import { ContainerCenter, links as containerCenterLinks } from '~/components/ContainerCenter';

// CONTEXT
import { useIsContactModalDisplayed } from '~/context';

// EXPORTS
export async function loader({ request }) {
	return {
		canonical: request.url,
	};
}

export function dynamicLinks({ data }) {
	return [{ rel: 'canonical', href: data.canonical }];
}

export function links() {
	return [...accordionLinks(), ...containerCenterLinks(), { rel: 'stylesheet', href: styles }];
}

export function meta() {
	return {
		description: "Learn about Joshua D. Graber's writing, editing, and web development work",
		title: 'Joshua D. Graber | Work',
	};
}

export const handle = {
	animatePresence: true,
	dynamicLinks,
	ref: React.createRef(),
};

export default function Work() {
	// HOOKS - CONTEXT
	const { setIsContactModalDisplayed } = useIsContactModalDisplayed();

	// SUB-COMPONENT
	const EmailLink = () => {
		// TODO: set up useLink, etc., use throughout page where email modal is opened.
		// Maybe also elsewhere (footer, etc.) where modal triggered?
		return (
			<div onClick={() => setIsContactModalDisplayed(true)} role='button'>
				Open email modal
			</div>
		);
	};

	return (
		<ContainerCenter className='jdg-work-container-center'>
			<div className='jdg-work-about-container'>
				<h2 className='jdg-work-heading'>About Me</h2>
				<p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque minima tempore ipsum
					at nisi magnam error blanditiis, inventore architecto dolore ratione quidem? Dignissimos,
					necessitatibus labore. Impedit molestiae distinctio dolorum velit. Rerum sit soluta minima
					molestiae numquam magnam optio rem, sapiente dolorum. Maxime ipsam, in velit expedita
					asperiores, facere odio fugiat voluptatem reiciendis alias nesciunt commodi quas dolores
					nisi labore culpa! Id sint consectetur non rem a, reiciendis ab aliquam, deleniti maiores
					perspiciatis quaerat expedita velit totam, ullam recusandae incidunt fuga minima sed?
					Aliquid beatae eligendi quis laborum dignissimos harum aliquam!
				</p>
			</div>

			<div className='jdg-work-work-container'>
				<h2 className='jdg-work-heading'>My Work</h2>
				<Accordion heading='Writing'>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita molestiae cum eius
					eaque quisquam nulla quis sunt delectus, repellendus cumque fugiat dolorum voluptates
					eligendi tenetur placeat veritatis nam voluptas quaerat. Animi dolorem quae repudiandae
					aliquid, voluptas atque dolorum consectetur perspiciatis fuga molestiae nemo sunt. Ad
					delectus sunt fugit similique maiores! Maxime error obcaecati, dolorem vero assumenda
					nobis voluptatum quisquam quis. Sed sunt similique nulla expedita velit reiciendis, in
					ipsam voluptatibus eligendi amet animi illum incidunt suscipit nihil repudiandae? Odio
					consectetur error doloribus possimus similique aliquam quaerat modi nihil maxime neque.
				</Accordion>

				<Accordion heading='Editing'>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita molestiae cum eius
					eaque quisquam nulla quis sunt delectus, repellendus cumque fugiat dolorum voluptates
					eligendi tenetur placeat veritatis nam voluptas quaerat. Animi dolorem quae repudiandae
					aliquid, voluptas atque dolorum consectetur perspiciatis fuga molestiae nemo sunt. Ad
					delectus sunt fugit similique maiores! Maxime error obcaecati, dolorem vero assumenda
					nobis voluptatum quisquam quis. Sed sunt similique nulla expedita velit reiciendis, in
					ipsam voluptatibus eligendi amet animi illum incidunt suscipit nihil repudiandae? Odio
					consectetur error doloribus possimus similique aliquam quaerat modi nihil maxime neque.
				</Accordion>

				<Accordion heading='JavaScript Development'>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita molestiae cum eius
					eaque quisquam nulla quis sunt delectus, repellendus cumque fugiat dolorum voluptates
					eligendi tenetur placeat veritatis nam voluptas quaerat. Animi dolorem quae repudiandae
					aliquid, voluptas atque dolorum consectetur perspiciatis fuga molestiae nemo sunt. Ad
					delectus sunt fugit similique maiores! Maxime error obcaecati, dolorem vero assumenda
					nobis voluptatum quisquam quis. Sed sunt similique nulla expedita velit reiciendis, in
					ipsam voluptatibus eligendi amet animi illum incidunt suscipit nihil repudiandae? Odio
					consectetur error doloribus possimus similique aliquam quaerat modi nihil maxime neque.
				</Accordion>
			</div>
		</ContainerCenter>
	);
}
