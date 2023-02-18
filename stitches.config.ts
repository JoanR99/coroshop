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
		marginX: (value: number) => ({
			marginLeft: value,
			marginRight: value,
		}),
	},
});
