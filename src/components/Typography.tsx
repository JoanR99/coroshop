import { styled, css } from '../../stitches.config';

const baseHeadingCss = css({
	color: '$main_dark',
	lineHeight: 1.2,

	variants: {
		size: {
			1: {
				fontSize: '1.563rem',
			},
			2: {
				fontSize: '1.953rem',
			},
			3: {
				fontSize: '2.441rem',
			},
			4: {
				fontSize: '3.052rem',
			},
			5: {
				fontSize: '3.815rem',
			},
		},
		transform: {
			uppercase: {
				textTransform: 'uppercase',
			},
			capitalize: {
				textTransform: 'capitalize',
			},
			lowercase: {
				textTransform: 'lowercase',
			},
		},
	},
});

export const Heading1 = styled('h1', baseHeadingCss, {
	lineHeight: 1,
	defaultVariants: {
		size: 5,
		transform: 'uppercase',
	},
});

export const Heading2 = styled('h2', baseHeadingCss, {
	defaultVariants: {
		size: 4,
	},
});

export const Heading3 = styled('h3', baseHeadingCss, {
	defaultVariants: {
		size: 3,
	},
});

export const Heading4 = styled('h4', baseHeadingCss, {
	defaultVariants: {
		size: 2,
	},
});

export const Paragraph = styled('p', {
	fontFamily: "'Montserrat', sans-serif",
	color: '$main_dark',

	variants: {
		fontSize: {
			1: {
				fontSize: '1rem',
			},
			2: {
				fontSize: '1.25rem',
			},
			3: {
				fontSize: '1.563rem',
			},
		},
	},

	defaultVariants: {
		fontSize: 2,
	},
});
