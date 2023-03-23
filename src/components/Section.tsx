import { styled } from '../../stitches.config';
import { Heading3, Heading2 } from './Typography';

export const SectionContainer = styled('section', {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	height: 'auto',

	variants: {
		flex: {
			column: {
				flexDirection: 'column',
				gap: '2rem',
			},
			'column-reverse': {
				flexDirection: 'column-reverse',
				gap: '2rem',
			},
			row: {
				flexDirection: 'row',
			},
		},
	},
});

export const SectionPartText = styled('div', {
	width: '48%',

	variants: {
		width: {
			half: {
				width: '48%',
			},
			full: {
				width: '80%',
				mb: '2rem',
			},
		},
	},
});

export const Section = styled('div', {
	'&:not(:last-child)': {
		borderBottom: '1px solid $main_light',
		mb: '2rem',
		pb: '2rem',
	},
});

export const SectionHeading = styled(Heading3, {
	mb: '1rem',
});

export const AuthSection = styled(SectionContainer, {
	backgroundColor: '$main_light',
	height: '86vh',
});

export const FormSection = styled(SectionPartText, {
	backgroundColor: '$main_light',
	height: '100%',
	display: 'grid',
	placeItems: 'center',
});

export const MarginHeading = styled(Heading2, { mb: '2rem' });
