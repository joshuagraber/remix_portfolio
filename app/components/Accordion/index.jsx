// GLOBALS
import React from 'react';
import styles from '../../styles/accordion.css';
import { bool, node, string } from 'prop-types';

// LIBS
import clsx from 'clsx';

// COMPONENTS
import { Chevron } from '../SVG/Chevron';

// HOOKS
import { useTheme } from '~/theme';

// UTIL
import { handleKeyDownLikeClick } from '~/utils/utils';

// EXPORTS
export function links() {
	return [{ rel: 'stylesheet', href: styles }];
}

export const Accordion = ({ children, isDisabled = false, isOpen = false, heading }) => {
	// HOOKS - STATE
	const [isAccordionOpen, setIsAccordionOpen] = React.useState(isOpen);

	// HOOKS - CUSTOM
	const { theme } = useTheme();

	// HOOKS - EFFECTS
	React.useEffect(() => {
		setIsAccordionOpen(isOpen);
	}, [isOpen]);

	// VARS
	const chevronDirection = isAccordionOpen ? 'up' : 'down';
	const chevronStroke = theme === 'jdg-light-mode' ? 'black' : 'white';
	const classes = clsx('jdg-accordion', {
		'jdg-accordion-disabled': isDisabled,
		'jdg-accordion-active': isAccordionOpen,
	});

	// HANDLERS
	const onClick = () => {
		if (isDisabled) {
			return;
		}

		setIsAccordionOpen((wasAccordionOpen) => !wasAccordionOpen);
	};

	const onKeydown = (event) => {
		handleKeyDownLikeClick(onClick, event);
	};

	return (
		<div className={classes}>
			<div className='jdg-accordion-heading-container'>
				<button
					aria-controls='jdg-accordion-body'
					aria-expanded={isAccordionOpen}
					className='jdg-accordion-button'
					disabled={isDisabled}
					onClick={onClick}
					onKeyDown={onKeydown}
					type='button'
				>
					<div className='jdg-accordion-heading-text'>{heading}</div>
					<div className='jdg-accordion-arrow'>
						<Chevron direction={chevronDirection} stroke={chevronStroke} />
					</div>
				</button>
			</div>
			<div aria-hidden={!isAccordionOpen} className='jdg-accordion-body' id='jdg-accordion-body'>
				<div className='jdg-accordion-body-container'>{children}</div>
			</div>
		</div>
	);
};

Accordion.propTypes = {
	children: node.isRequired,
	isDisabled: bool,
	isOpen: bool,
	heading: string,
};
