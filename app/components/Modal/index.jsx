// GLOBALS
import React from 'react';
import styles from './styles.css';

// COMPONENTS
import { Portal } from '../Portal';
import { Transition } from 'react-transition-group';
import { X } from '../SVG/X';

// HOOKS
import { useTheme } from '~/theme';

// EXTERNAL LIBS
import clsx from 'clsx';
import { getDocument } from 'ssr-window';

// UTILS
import { handleKeyDownLikeClick } from '~/utils/utils';

// EXPORTS
export function links() {
	return [{ rel: 'stylesheet', href: styles }];
}

export const Modal = ({ className = '', children, hide, isVisible = false }) => {
	// GLOBALS
	const document = getDocument();

	// CONTEXT
	const { theme } = useTheme();

	// HOOKS - EFFECTS
	// Lock scroll
	React.useEffect(() => {
		const rootDataSet = document.querySelector('html')?.dataset;

		// Prevent scroll behind modal when open
		if (isVisible) {
			rootDataSet.lockscroll = 'true';
		} else {
			rootDataSet.lockscroll = 'false';
		}

		return () => {
			rootDataSet.lockscroll = 'false';
		};
	}, [isVisible]);

	// Handlers
	const handleCloseModalKeyDown = (event) => {
		event.stopPropagation();
		handleKeyDownLikeClick(closeModal, event);
	};

	const stopPropagation = (event) => {
		event.stopPropagation();
	};

	const closeModal = (event) => {
		event.stopPropagation();
		hide();
	};

	// VARS
	const transitionProps = {
		in: isVisible,
		mountOnEnter: true,
		unmountOnExit: true,
		timeout: 100,
	};

	const closeModalStroke = theme === 'jdg-light-mode' ? 'black' : 'white';

	// Render
	return (
		<Transition {...transitionProps}>
			{(state) => {
				const classes = clsx('jdg-modal', className, {
					// Transitions
					'jdg-modal-entering': state === 'entering',
					'jdg-modal-entered': state === 'entered',
					'jdg-modal-exiting': state === 'exiting',
					'jdg-modal-exited': state === 'exited',
				});

				// TODO: set up handler to focus modal when it opens

				return (
					<Portal className={classes}>
						<div
							aria-modal='true'
							className='jdg-modal-backdrop'
							onClick={stopPropagation}
							onKeyDown={stopPropagation}
							role='dialog'
						>
							<div className='jdg-modal-container'>
								<div
									aria-label='Close modal'
									className='jdg-modal-icon-container'
									onClick={closeModal}
									onKeyDown={handleCloseModalKeyDown}
									role='button'
									tabIndex='0'
								>
									<X stroke={closeModalStroke} />
								</div>

								<div className='jdg-modal-content'>{children}</div>
							</div>
						</div>
					</Portal>
				);
			}}
		</Transition>
	);
};
