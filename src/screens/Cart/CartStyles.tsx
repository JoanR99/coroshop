import {
	Heading2,
	Heading3,
	Heading4,
	Paragraph,
} from '../../components/Typography';
import { StyledContainer } from '../../components/Container';
import { styled } from '../../../stitches.config';

export const Heading = styled(Heading2, {
	my: '2rem',
});

export const CartContainer = styled('div', {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'flex-start',
});

export const CartItemsContainer = styled(StyledContainer, {
	width: '78%',
});

export const CartSubTotalContainer = styled(StyledContainer, {
	width: '18%',
});

export const CheckoutHeader = styled('div', {
	width: '100%',
	pb: '1rem',
	display: 'flex',
	justifyContent: 'space-between',
	borderBottom: '1px solid darkgrey',
});

export const HeaderBlock = styled('div', {
	textTransform: 'capitalize',
	width: '23%',

	'&:last-child': {
		width: '8%',
	},
});

export const SubTotalHeading = styled(Heading3, {
	mb: '2rem',
});

export const ItemsHeading = styled(Heading4, {
	mb: '0.8rem',
});

export const PriceParagraph = styled(Paragraph, {
	mb: '2rem',
});
