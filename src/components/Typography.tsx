import { styled } from '../../stitches.config';

const BaseHeading = {
	fontWeight: 'bold',
	color: '$main_dark',
};

export const Heading1 = styled('h1', {
	fontSize: '3rem',
	textTransform: 'uppercase',
	lineHeight: 1,
	marginBottom: '2rem',
	...BaseHeading,
});

export const Heading2 = styled('h2', {
	fontSize: '2.4rem',
	...BaseHeading,
});

export const Heading3 = styled('h3', {
	fontSize: '1.9rem',
	...BaseHeading,
});

export const Heading4 = styled('h4', {
	fontSize: '1.4rem',
	...BaseHeading,
});

export const Paragraph = styled('p', {
	fontFamily: "'Montserrat', sans-serif",
	fontSize: '1.4rem',
	color: '$main_dark',
});
