// GLOBALS
import React from 'react';
import { bool, func, node, string } from 'prop-types';
import styles from '../../styles/modal.css';

// COMPONENTS
import { Portal } from '../Portal';
import { CSSTransition } from 'react-transition-group';
import { X } from '../SVG/X';

// EXTERNAL LIBS
import clsx from 'clsx';
import FocusTrap from 'focus-trap-react';
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
	const ref = React.useRef();

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
		classNames: 'jdg-modal',
		in: isVisible,
		mountOnEnter: true,
		unmountOnExit: true,
		timeout: 400,
	};

	// Render
	return (
		<CSSTransition {...transitionProps}>
			{(state) => {
				const classes = clsx('jdg-modal', className, {
					// Transitions
					'jdg-modal-entering': state === 'entering',
					'jdg-modal-entered': state === 'entered',
					'jdg-modal-exiting': state === 'exiting',
					'jdg-modal-exited': state === 'exited',
				});

				return (
					<Portal className={classes} id='jdg-modal-container' tabIndex={-1}>
						<div
							aria-modal='true'
							className='jdg-modal-backdrop'
							onClick={stopPropagation}
							onKeyDown={stopPropagation}
							role='dialog'
						>
							<FocusTrap
								focusTrapOptions={{
									initialFocus: true,
									fallbackFocus: () => {
										if (ref.current) {
											return ref.current;
										}
									},
								}}
							>
								<div className='jdg-modal-container' ref={ref}>
									<div
										aria-label='Close modal'
										className='jdg-modal-icon-container'
										onClick={closeModal}
										onKeyDown={handleCloseModalKeyDown}
										role='button'
										tabIndex={0}
									>
										<X />
									</div>

									<div className='jdg-modal-content'>{children}</div>
								</div>
							</FocusTrap>
						</div>
					</Portal>
				);
			}}
		</CSSTransition>
	);
};

Modal.propTypes = {
	className: string,
	children: node.isRequired,
	hide: func.isRequired,
	isVisible: bool.isRequired,
};
