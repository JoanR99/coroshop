import { Link } from 'react-router-dom';
import { styled } from '../../stitches.config';

const dark = {
	color: '$main_dark',

	'&:visited, &:active': {
		color: '$main_dark',
	},

	'&:hover': {
		color: '$action',
	},
};

const light = {
	color: '#f1faee',

	'&:visited, &:active': {
		color: '#f1faee',
	},

	'&:hover': {
		color: '$action',
	},
};

export const StyledLink = styled(Link, {
	textDecoration: 'none',
});

export const StyledLink1 = styled(StyledLink, {
	fontSize: '3rem',
	fontWeight: 'bold',

	variants: {
		theme: {
			dark,
			light,
		},
	},
});

export const StyledLink2 = styled(StyledLink, {
	fontSize: '2.4rem',
	fontWeight: 'bold',

	variants: {
		theme: {
			dark,
			light,
		},
	},
});

export const StyledLink3 = styled(StyledLink, {
	fontSize: '1.9rem',
	fontWeight: 'bold',

	variants: {
		theme: {
			dark,
			light,
		},

		size: {
			small: {
				fontSize: '1.6rem',
			},
			normal: {
				fontSize: '1.9rem',
			},
		},
	},
});

export const StyledLink4 = styled(StyledLink, {
	fontSize: '1.6rem',
	fontWeight: 'bold',

	variants: {
		theme: {
			dark,
			light,
		},
		size: {
			small: {
				fontSize: '1.2rem',
			},
			normal: {
				fontSize: '1.6rem',
			},
		},
	},
});

export const StyledLink5 = styled(StyledLink, {
	fontWeight: 'regular',

	variants: {
		theme: {
			dark,
			light,
		},
		size: {
			small: {
				fontSize: '1.2rem',
			},
			normal: {
				fontSize: '1.6rem',
			},
		},
	},
});

export const LinkContainer = styled('div', {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	gap: '2rem',

	variants: {
		gap: {
			'1': {
				gap: '1rem',
			},
			'2': {
				gap: '2rem',
			},
		},
	},
});
