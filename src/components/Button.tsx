import { styled } from '../../stitches.config';

const Button = styled('button', {
	borderRadius: '1rem',
	border: 'none',
	cursor: 'pointer',
	padding: '1rem 2rem',

	variants: {
		size: {
			small: {
				fontSize: '1.2rem',
				padding: '0.5rem 1rem',
				borderRadius: '0.5rem',
			},
			normal: {
				fontSize: '1.6rem',
				padding: '1rem 2rem',
			},
		},
		variant: {
			main: {
				backgroundColor: '$action',
				color: '$light',
			},
			add: {
				backgroundColor: '$add',
				color: '$light',
			},
			edit: {
				backgroundColor: '$edit',
				color: '$main_dark',
			},
			ghost: {
				backgroundColor: '$light',
				color: 'DarkGray',
				border: '1px solid DarkGray',
			},
			search: {
				backgroundColor: '$main_light',
				padding: '0.5rem 1rem',
			},
			linkLight: {
				fontSize: '1.6rem',
				fontWeight: 'bold',
				color: '$main_dark',
				backgroundColor: 'transparent',
				'&:hover': {
					color: '$action',
				},
			},
			linkDark: {
				fontSize: '1.6rem',
				fontWeight: 'bold',
				color: '$light',
				'&:hover': {
					color: '$action',
				},
			},
		},
	},
});

export default Button;
