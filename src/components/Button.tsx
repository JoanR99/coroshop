import { styled } from '../../stitches.config';

const Button = styled('button', {
	border: 'none',
	cursor: 'pointer',

	variants: {
		size: {
			small: {
				padding: '0.5rem 1rem',
				borderRadius: '0.5rem',
			},
			normal: {
				padding: '1rem 2rem',
				borderRadius: '1rem',
			},
		},
		fontSize: {
			3: {
				fontSize: '1.9rem',
			},
			2: {
				fontSize: '1.6rem',
			},
			1: {
				fontSize: '1.2rem',
			},
		},
		fontWeight: {
			regular: {
				fontWeight: 'normal',
			},
			bold: {
				fontWeight: 'bold',
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
				border: 'none',
				backgroundColor: 'transparent',
			},
			linkLight: {
				color: '$main_dark',
				backgroundColor: 'transparent',
				'&:hover': {
					color: '$action',
				},
			},
			linkDark: {
				backgroundColor: 'transparent',
				color: '$light',
				'&:hover': {
					color: '$action',
				},
			},
		},
	},

	defaultVariants: {
		variant: 'main',
		size: 'normal',
		fontSize: '2',
		fontWeight: 'regular',
	},
});

export default Button;
