// GLOBALS
import { oneOf, string } from 'prop-types';

export const X = ({ height = '24px', stroke = 'white', width = '24px' }) => (
	<svg
		width={width}
		height={height}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M20 20L4 4.00003M20 4L4.00002 20'
			stroke={stroke}
			strokeWidth='2'
			strokeLinecap='round'
		/>
	</svg>
);

X.propTypes = {
	height: string,
	stroke: oneOf(['white', 'black']),
	width: string,
};
