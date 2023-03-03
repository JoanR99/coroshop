import { styled } from '../../stitches.config';

export const Card = styled('article', {
	minHeight: '20rem',
	maxHeight: '24rem',
	padding: 0,
	paddingBottom: '1rem',
	borderRadius: '0.3rem',
	boxShadow: '0 1.5rem 4rem rgba(0, 0, 0, 0.25)',
	transition: 'all 0.3s',
	cursor: 'pointer',
	backgroundColor: '$light',

	'&:hover': {
		transform: 'translateY(-0.8rem) scale(1.03)',
		boxShadow: '0 1.5rem 4rem rgba(0, 0, 0, 0.4)',
	},
});

export const CardPrice = styled('p', {
	fontSize: '12px',
	color: 'Gray',
});

export const CardImage = styled('img', {
	width: '100%',
	margin: 0,
	height: '50%',
});

export const CardBody = styled('ul', {
	listStyle: 'none',
	width: '80%,',
	margin: '0 auto',
});

export const CardItem = styled('li', {
	textAlign: 'center',
	fontSize: '1.5rem',
	padding: '0.5rem',
});

export const CardReview = styled('div', {
	padding: 0,
	minHeight: 'fit-content',
	maxHeight: '20rem',
	borderRadius: '0.3rem',
	boxShadow: '0 1.5rem 4rem rgba(0, 0, 0, 0.3)',
	borderTop: 'solid 0.5rem $main_light',
});
