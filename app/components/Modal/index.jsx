// GLOBALS
import React from 'react';
import styles from './styles.css';

// COMPONENTS
import { Portal } from '../Portal';
import { Transition } from 'react-transition-group';
import { X } from '../SVG/X';

// EXTERNAL LIBS
import clsx from 'clsx';
import { getDocument } from 'ssr-window';

// HOOKS
import { useEffectDidUpdate } from '../../hooks/useEffectDidUpdate';
import { useTheme } from '~/theme';

// EXPORTS
export function links() {
	return [{ rel: 'stylesheet', href: styles }];
}

export const Modal = (props) => {
	const document = getDocument();

	const {
		className = '',
		children,
		hide,
		isClosable = true,
		isSuccess = false,
		isVisible = false,
	} = props;

	// HOOKS - CUSTOM
	const { theme } = useTheme();

	// HOOKS - EFFECTS
	// Hide modal on completion
	useEffectDidUpdate(() => {
		if (isSuccess) {
			hide();
		}
	}, [isSuccess]);

	// Handle effect for scroll lock
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

	// TODO: write onKeyDown handler, use here.
	// Handlers
	// const handleOnKeyDown = (event) => {
	//   onKeyDown([
	//     {
	//       event,
	//       key: 'Enter',
	//       handler: closeHandler
	//     }
	//   ]);
	// };

	const stopClickBubble = (event) => {
		event.stopPropagation();
	};

	const closeHandler = (event) => {
		event.stopPropagation();
		hide();
	};

	// Vars
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

				return (
					<Portal className={classes}>
						<div
							aria-modal='true'
							className='jdg-modal-backdrop'
							onClick={stopClickBubble}
							onKeyDown={stopClickBubble}
							role='dialog'
						>
							<div className='jdg-modal-container'>
								{/* Icon */}
								{isClosable && (
									<div
										className='jdg-modal-icon-container'
										onClick={closeHandler}
										// onKeyDown={handleOnKeyDown}
										role='button'
										tabIndex={0}
									>
										<X stroke={closeModalStroke} />
									</div>
								)}
								{/* Body */}
								<div className='jdg-modal-content'>{children}</div>
							</div>
						</div>
					</Portal>
				);
			}}
		</Transition>
	);
};
