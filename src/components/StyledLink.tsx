import { Link } from 'react-router-dom';
import { styled } from '../../stitches.config';

const StyledLink = styled(Link, {
	textDecoration: 'none',

	variants: {
		theme: {
			dark: {
				color: '$main_dark',

				'&:visited, &:active': {
					color: '$main_dark',
				},

				'&:hover': {
					color: '$action',
				},
			},
			light: {
				color: '$light',

				'&:visited, &:active': {
					color: '$light',
				},

				'&:hover': {
					color: '$action',
				},
			},
		},
		fontSize: {
			5: {
				fontSize: '3rem',
			},
			4: {
				fontSize: '2.4rem',
			},
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
			bold: {
				fontWeight: 'bold',
			},
			normal: {
				fontWeight: 'normal',
			},
		},
	},
	defaultVariants: {
		fontWeight: 'normal',
		fontSize: 2,
	},
});

export default StyledLink;
