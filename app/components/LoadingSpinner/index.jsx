// GLOBALS
import { string } from 'prop-types';
import styles from '../../styles/loading-spinner.css';

// EXPORTS
export function links() {
	return [{ rel: 'stylesheet', href: styles }];
}

export const LoadingSpinner = ({
	color = 'currentColor',
	height = '120px',
	width = '120px',
	text = null,
}) => {
	return (
		<div className='jdg-loading-spinner'>
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

			{text && <p className='jdg-loading-spinner-text'>{text}</p>}
		</div>
	);
};

LoadingSpinner.propTypes = {
	color: string,
	height: string,
	width: string,
	text: string,
};
