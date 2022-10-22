// GLOBALS
interface Props {
	height?: string;
	color?: string;
	width?: string;
}
export const X = ({ height = '24px', color = 'currentColor', width = '24px' }) => (
	<svg
		width={width}
		height={height}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M20 20L4 4.00003M20 4L4.00002 20'
			stroke={color}
			strokeWidth='2'
			strokeLinecap='round'
		/>
	</svg>
);
