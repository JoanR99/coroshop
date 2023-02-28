import { styled } from '../../../../stitches.config';
import { SectionContainer } from '../../../components/Section';
import { StyledContainer } from '../../../components/Container';

export const ProductViewContainer = styled(SectionContainer, {
	mt: '4rem',
	alignItems: 'flex-start',
});

export const ProductImage = styled('img', {
	width: '100%',
});

export const ProductDetails = styled(StyledContainer, {
	width: '90%',
	mx: 'auto',
	my: '4rem',
});

export const Detail = styled('div', {
	my: '1rem',
});

export const QuantityBox = styled('div', {
	display: 'inline-block',
	mr: '1rem',
});
