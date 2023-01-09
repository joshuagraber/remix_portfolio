// GLOBALS
import styles from 'styles/accordion.css';
import React from 'react';
import { Form, useLocation, useSearchParams } from '@remix-run/react';

// LIBS
import clsx from 'clsx';

// COMPONENTS
import { Chevron } from 'components/SVG/Chevron';

// UTIL
import { scrollTo } from 'utils/utils';

// EXPORTS
export function links() {
	return [{ rel: 'stylesheet', href: styles }];
}

// TYPES
interface Props {
	children: React.ReactElement | string;
	isDisabled?: boolean;
	heading: string;
	name: string;
}

export const Accordion: React.FC<Props> = ({ children, isDisabled = false, heading, name }) => {
	// HOOKS - GLOBAL
	const { pathname } = useLocation();
	const [params] = useSearchParams();

	const newParams = new URLSearchParams(params);

	// VARS
	const isAccordionOpen = typeof params.get(name) === 'string';
	const buttonName = !isAccordionOpen ? name : undefined;

	if (isAccordionOpen) {
		newParams.delete(name);
	}

	// VARS
	const classes = clsx('jdg-accordion', {
		'jdg-accordion-disabled': isDisabled,
		'jdg-accordion-active': isAccordionOpen,
	});

	return (
		<div className={classes}>
			<div className='jdg-accordion-heading-container'>
				<Form action={`${pathname}?${newParams.toString()}`}>
					<button
						aria-controls='jdg-accordion-body'
						aria-expanded={isAccordionOpen}
						className='jdg-accordion-button'
						disabled={isDisabled}
						name={buttonName}
						type='submit'
					>
						<div className='jdg-accordion-heading-text'>{heading}</div>
						<div className='jdg-accordion-icon'>
							<Chevron direction='down' />
						</div>
					</button>
				</Form>
			</div>
			<div aria-hidden={!isAccordionOpen} className='jdg-accordion-body' id='jdg-accordion-body'>
				<div className='jdg-accordion-body-container'>{children}</div>
			</div>
		</div>
	);
};
