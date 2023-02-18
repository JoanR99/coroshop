// import styled from 'styled-components';
import { styled } from '../../stitches.config';

const Button = styled('button', {
	borderRadius: '5rem',
	padding: '1rem 2rem',
	border: 'none',
	cursor: 'pointer',

	variants: {
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
				color: '$action',
				fontSize: '2rem',
			},
			search: {
				backgroundColor: '$main_light',
				padding: '0.5rem 1rem',
			},
			linkLight: {
				fontSize: '1.6rem',
				fontWeight: 'bold',
				color: '$main_dark',
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
