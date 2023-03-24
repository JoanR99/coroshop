import { createStitches } from '@stitches/react';

export const {
	styled,
	css,
	globalCss,
	keyframes,
	getCssText,
	theme,
	createTheme,
	config,
} = createStitches({
	theme: {
		colors: {
			action: '#e63946',
			light: '#f1faee',
			main: '#457b9d',
			main_light: '#a8dadc',
			main_dark: '#1d3557',
			add: '#2067b8',
			edit: '#f7cb07',
		},
	},
	media: {
		sm: '(min-width: 640px)',
		md: '(min-width: 768px)',
		lg: '(min-width: 1024px)',
	},
	utils: {
		m: (value: string) => ({
			margin: value,
		}),
		mt: (value: string) => ({
			marginTop: value,
		}),
		mr: (value: string) => ({
			marginRight: value,
		}),
		mb: (value: string) => ({
			marginBottom: value,
		}),
		ml: (value: string) => ({
			marginLeft: value,
		}),
		mx: (value: string) => ({
			marginLeft: value,
			marginRight: value,
		}),
		my: (value: string) => ({
			marginTop: value,
			marginBottom: value,
		}),
	},
});

export const globalStyles = globalCss({
	'*, *::before, *::after': {
		margin: 0,
		padding: 0,
		boxSizing: 'inherit',
	},

	html: {
		fontSize: '62.5%',
	},

	body: {
		fontFamily: "'Lato', sans-serif",
		fontWeight: 400,
		lineHeight: 1.75,
		boxSizing: 'border-box',
	},
});
