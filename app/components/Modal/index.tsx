// GLOBALS
import { CSSTransition } from 'react-transition-group';
import styles from 'styles/modal.css';
import React from 'react';

// COMPONENTS
import { Portal } from 'components/Portal';
import { X } from 'components/SVG/X';

// EXTERNAL LIBS
import type { ClassValue } from 'clsx';
import clsx from 'clsx';
import FocusTrap from 'focus-trap-react';
import { getDocument } from 'ssr-window';

// UTILS
import { handleKeyDownLikeClick } from 'utils/utils.client';

// TYPES
import type { LinksFunction } from '@remix-run/node';
interface Props {
	className?: ClassValue;
	children: React.ReactElement | React.ReactNode;
	hide: () => void;
	isVisible: boolean;
}

// EXPORTS
export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: styles }];
};

export const Modal: React.FC<Props> = ({ className = '', children, hide, isVisible = false }) => {
	// GLOBALS
	const document = getDocument();
	const ref = React.useRef<HTMLDivElement>(null);

	// HOOKS - EFFECTS
	// Lock scroll
	React.useEffect(() => {
		const rootDataSet = document.querySelector('html')?.dataset;

		if (typeof rootDataSet === 'undefined') return;

		// Prevent scroll behind modal when open
		if (isVisible) {
			rootDataSet.lockscroll = 'true';
		} else {
			rootDataSet.lockscroll = 'false';
		}

		return () => {
			rootDataSet.lockscroll = 'false';
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isVisible]);

	// Handlers
	const handleCloseModalKeyDown = (event: React.KeyboardEvent) => {
		event.stopPropagation();
		handleKeyDownLikeClick(closeModal, event);
	};

	const stopPropagation = (event: React.KeyboardEvent | React.MouseEvent) => {
		event.stopPropagation();
	};

	const closeModal = (event: React.MouseEvent | React.KeyboardEvent) => {
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
									initialFocus: ref.current ?? undefined,
									fallbackFocus: () => {
										if (ref.current) {
											return ref.current;
										}
										return '';
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
