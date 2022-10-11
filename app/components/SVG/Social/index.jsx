import { oneOf, string } from 'prop-types';

export const SocialIcon = ({ color = 'currentColor', type }) => {
	switch (type) {
		case 'email':
			return (
				<svg
					width='24px'
					height='24px'
					viewBox='0 0 24 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M2 6C2 4.89543 2.89543 4 4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6Z'
						stroke={color}
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path
						d='M2 8L9.50122 14.001C10.9621 15.1697 13.0379 15.1697 14.4988 14.001L22 8'
						stroke={color}
						strokeWidth='2'
						strokeLinejoin='round'
					/>
				</svg>
			);
		case 'github':
			return (
				<svg
					width='24px'
					height='24px'
					viewBox='0 0 24 24'
					role='img'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'
						fill={color}
					/>
				</svg>
			);
		case 'linkedin':
			return (
				<svg
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M2.72727 0C1.2358 0 0 1.2358 0 2.72727V21.2727C0 22.7642 1.2358 24 2.72727 24H21.2727C22.7642 24 24 22.7642 24 21.2727V2.72727C24 1.2358 22.7642 0 21.2727 0H2.72727ZM2.72727 2.18182H21.2727C21.5838 2.18182 21.8182 2.41619 21.8182 2.72727V21.2727C21.8182 21.5838 21.5838 21.8182 21.2727 21.8182H2.72727C2.41619 21.8182 2.18182 21.5838 2.18182 21.2727V2.72727C2.18182 2.41619 2.41619 2.18182 2.72727 2.18182ZM5.93182 4.05682C4.89631 4.05682 4.05682 4.89631 4.05682 5.93182C4.05682 6.96733 4.89631 7.80682 5.93182 7.80682C6.96733 7.80682 7.80682 6.96733 7.80682 5.93182C7.80682 4.89631 6.96733 4.05682 5.93182 4.05682ZM15.7841 9.03409C14.2202 9.03409 13.1804 9.89063 12.75 10.7045H12.6818V9.27273H9.61364V19.6364H12.8182V14.5227C12.8182 13.1719 13.0866 11.8636 14.7614 11.8636C16.4105 11.8636 16.4318 13.3892 16.4318 14.5909V19.6364H19.6364V13.9432C19.6364 11.1563 19.044 9.03409 15.7841 9.03409ZM4.36364 9.27273V19.6364H7.60227V9.27273H4.36364Z'
						fill={color}
					/>
				</svg>
			);
		case 'twitter':
			return (
				<svg
					width='24px'
					height='24px'
					viewBox='0 0 24 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M23 3.01006C23 3.01006 20.9821 4.20217 19.86 4.54006C19.2577 3.84757 18.4573 3.35675 17.567 3.13398C16.6767 2.91122 15.7395 2.96725 14.8821 3.29451C14.0247 3.62177 13.2884 4.20446 12.773 4.96377C12.2575 5.72309 11.9877 6.62239 12 7.54006V8.54006C10.2426 8.58562 8.50127 8.19587 6.93101 7.4055C5.36074 6.61513 4.01032 5.44869 3 4.01006C3 4.01006 -1 13.0101 8 17.0101C5.94053 18.408 3.48716 19.109 1 19.0101C10 24.0101 21 19.0101 21 7.51006C20.9991 7.23151 20.9723 6.95365 20.92 6.68006C21.9406 5.67355 23 3.01006 23 3.01006Z'
						stroke={color}
						strokeWidth='1.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			);
		default:
			return null;
	}
};

SocialIcon.propTypes = {
	color: string,
	type: oneOf(['email', 'github', 'linkedin', 'twitter']).isRequired,
};
