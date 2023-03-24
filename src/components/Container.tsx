import { styled } from '../../stitches.config';

export const Container = styled('div', {
	width: '90%',
	margin: 'auto',
});

export const StyledContainer = styled('div', {
	borderTop: 'solid 1rem #a8dadc',
	borderRadius: '1rem',
	padding: '2rem',
	boxShadow: '0 1.5rem 4rem rgba(0, 0, 0, 0.2)',

	variants: {
		size: {
			main: {
				width: '63%',
			},
			secondary: {
				width: '33%',
			},
		},
	},
});
