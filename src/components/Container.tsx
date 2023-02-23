import { styled } from '../../stitches.config';

export const Container = styled('div', {
	width: '90%',
	margin: 'auto',

	variants: {
		display: {
			flex_start: {
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'flex-start',
			},
		},
		space: {
			bottom: {
				mb: '2rem',
			},
		},
	},
});

export const StyledContainer = styled('div', {
	borderTop: 'solid 1rem #a8dadc',
	borderRadius: '1rem',
	padding: '2rem',
	boxShadow: '0 1.5rem 4rem rgba(0, 0, 0, 0.2)',

	variants: {
		width: {
			'2/3': {
				width: '63%',
			},
			'1/3': {
				width: '33%',
			},
		},
	},
});
