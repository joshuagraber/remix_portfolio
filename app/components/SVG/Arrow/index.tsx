interface Props {
	direction: 'down' | 'left' | 'right' | 'up';
	height?: string;
	color?: string;
	width?: string;
}

export const Arrow: React.FC<Props> = ({
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
						d='M12 20L12 4'
						stroke={color}
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path
						d='M5 13L12 20L19 13'
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
						d='M11 5L4 12L11 19'
						stroke={color}
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path
						d='M4 12H20'
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
						d='M4 12H20'
						stroke={color}
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path
						d='M13 5L20 12L13 19'
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
						d='M12 20L12 4'
						stroke={color}
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path
						d='M5 11L12 4L19 11'
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
