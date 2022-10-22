// GLOBALS
import styles from 'styles/accordion.css';
import React from 'react';

// LIBS
import clsx from 'clsx';

// COMPONENTS
import { Chevron } from 'components/SVG/Chevron';

// UTIL
import { handleKeyDownLikeClick } from 'utils/utils.client';

// EXPORTS
export function links() {
	return [{ rel: 'stylesheet', href: styles }];
}

// TYPES
interface Props {
	children: React.ReactElement;
	isDisabled?: boolean;
	isOpen?: boolean;
	heading: string;
}

export const Accordion: React.FC<Props> = ({
	children,
	isDisabled = false,
	isOpen = false,
	heading,
}) => {
	// HOOKS - STATE
	const [isAccordionOpen, setIsAccordionOpen] = React.useState(isOpen);

	// HOOKS - EFFECTS
	React.useEffect(() => {
		setIsAccordionOpen(isOpen);
	}, [isOpen]);

	// VARS
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

	const onKeydown = (event: React.KeyboardEvent) => {
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
					<div className='jdg-accordion-icon'>
						<Chevron direction='down' />
					</div>
				</button>
			</div>
			<div aria-hidden={!isAccordionOpen} className='jdg-accordion-body' id='jdg-accordion-body'>
				<div className='jdg-accordion-body-container'>{children}</div>
			</div>
		</div>
	);
};
