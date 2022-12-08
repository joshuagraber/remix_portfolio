// GLOBALS
import clsx from 'clsx';
import { getDocument } from 'ssr-window';
import { Link } from '@remix-run/react';
import styles from 'styles/modal.css';
import React from 'react';

// COMPONENTS
import { CSSTransition } from 'react-transition-group';
import FocusTrap from 'focus-trap-react';
import { Portal } from 'components/Portal';
import { X } from 'components/SVG/Close';

// TYPES
import type { ClassValue } from 'clsx';
import type { LinksFunction } from '@remix-run/node';
interface Props {
	className?: ClassValue;
	children: React.ReactElement | React.ReactNode;
	isVisible: boolean;
	pathToClose: string;
}

// EXPORTS
export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: styles }];
};

export const Modal: React.FC<Props> = ({
	className = '',
	pathToClose,
	children,
	isVisible = false,
}) => {
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

	const stopPropagation = (event: React.KeyboardEvent | React.MouseEvent) => {
		event.stopPropagation();
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
									<Link
										aria-label='Close modal'
										className='jdg-modal-icon-container'
										replace
										to={pathToClose}
									>
										<X />
									</Link>

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
