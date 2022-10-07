// GLOBALS
import React from 'react';
import { bool, string } from 'prop-types';
import styles from '../../styles/loading-spinner.css';
import { CSSTransition } from 'react-transition-group';

import clsx from 'clsx';

// EXPORTS
export function links() {
	return [{ rel: 'stylesheet', href: styles }];
}

export const LoadingSpinner = ({
	color = 'currentColor',
	height = '100px',
	isDisplayed = false,
	width = '100px',
	text = null,
}) => {
	// HOOKS - REF
	const ref = React.useRef(null);

	// CONSTANTS
	const transitionProps = {
		classNames: 'jdg-loading-spinner',
		in: isDisplayed,
		mountOnEnter: true,
		nodeRef: ref,
		timeout: 300,
		unmountOnExit: true,
	};

	return (
		<CSSTransition {...transitionProps}>
			{(state) => {
				const classes = clsx('jdg-loading-spinner', {
					// Transitions
					'jdg-loading-spinner-entering': state === 'entering',
					'jdg-loading-spinner-entered': state === 'entered',
					'jdg-loading-spinner-exiting': state === 'exiting',
					'jdg-loading-spinner-exited': state === 'exited',
				});

				return (
					<div className={classes} ref={ref}>
						<svg
							width={width}
							height={height}
							viewBox='0 0 38 38'
							xmlns='http://www.w3.org/2000/svg'
							stroke={color}
						>
							<g fill='none' fillRule='evenodd'>
								<g transform='translate(1 1)' strokeWidth='2'>
									<circle strokeOpacity='.5' cx='18' cy='18' r='18' />
									<path d='M36 18c0-9.94-8.06-18-18-18'>
										<animateTransform
											attributeName='transform'
											type='rotate'
											from='0 18 18'
											to='360 18 18'
											dur='1.2s'
											repeatCount='indefinite'
										/>
									</path>
								</g>
							</g>
						</svg>

						{text && <span className='jdg-loading-spinner-text'>{text}</span>}
					</div>
				);
			}}
		</CSSTransition>
	);
};

LoadingSpinner.propTypes = {
	color: string,
	height: string,
	isDisplayed: bool,
	width: string,
	text: string,
};
