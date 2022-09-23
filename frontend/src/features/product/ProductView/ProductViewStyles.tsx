import styled from 'styled-components';
import { SectionContainer } from '../../../components/Section';
import { StyledContainer } from '../../../components/Container';

export const ProductViewContainer = styled(SectionContainer)`
	margin-top: 4rem;
	align-items: flex-start;
`;

export const ProductImage = styled.img`
	width: 100%;
`;

export const ProductDetails = styled(StyledContainer)`
	width: 90%;
	margin: auto;
	margin-top: 4rem;
	margin-bottom: 4rem;
`;

export const Detail = styled.div`
	margin-top: 1rem;
	margin-bottom: 1rem;
`;

export const QuantityBox = styled.div`
	display: inline-block;
	margin-right: 1rem;
`;
