interface Props {
	direction: 'down' | 'left' | 'right' | 'up';
	height?: string;
	color?: string;
	width?: string;
}

export const Chevron: React.FC<Props> = ({
	direction,
	height = '24px',
	color = 'currentColor',
	width = '24px',
}) => {
	switch (direction) {
		case 'down':
			return (
				<svg
					width={width}
					height={height}
					viewBox='0 0 24 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M4 9L12 17L20 9'
						stroke={color}
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			);
		case 'left':
			return (
				<svg
					width={width}
					height={height}
					viewBox='0 0 24 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M15 4L7 12L15 20'
						stroke={color}
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			);
		case 'right':
			return (
				<svg
					width={width}
					height={height}
					viewBox='0 0 24 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M8 4L16 12L8 20'
						stroke={color}
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			);
		case 'up':
			return (
				<svg
					width={width}
					height={height}
					viewBox='0 0 24 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M4 15L12 7L20 15'
						stroke={color}
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			);
		default:
			return null;
	}
};
