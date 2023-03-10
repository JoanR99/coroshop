import { styled } from '../../stitches.config';
import { keyframes } from '@stitches/react';

export const SpinnerOverlay = styled('div', {
	width: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
});

const spin = keyframes({
	to: {
		transform: 'rotate(360deg)',
	},
});

export const SpinnerContainer = styled('div', {
	display: 'inline-block',
	width: '50px',
	height: '50px',
	border: '3px solid rgba(195, 195, 195, 0.6)',
	borderRadius: '50%',
	borderTopColor: '#636767',
	animation: `${spin} 1s ease-in-out infinite`,
});

const Spinner = () => (
	<SpinnerOverlay>
		<SpinnerContainer />
	</SpinnerOverlay>
);

export default Spinner;
