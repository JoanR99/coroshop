import styled from 'styled-components';

import {
	Heading2,
	Heading3,
	Heading4,
	Paragraph,
} from '../../components/Typography';
import { StyledContainer } from '../../components/Container';

export const Heading = styled(Heading2)`
	margin-bottom: 2rem;
	margin-top: 2rem;
`;

export const CartContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
`;

export const CartItemsContainer = styled(StyledContainer)`
	width: 78%;
`;

export const CartSubTotalContainer = styled(StyledContainer)`
	width: 18%;
`;

export const CheckoutHeader = styled.div`
	width: 100%;
	padding-bottom: 1rem;
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid darkgrey;
`;

export const HeaderBlock = styled.div`
	text-transform: capitalize;
	width: 23%;
	&:last-child {
		width: 8%;
	}
`;

export const SubTotalHeading = styled(Heading3)`
	margin-bottom: 2rem;
`;

export const ItemsHeading = styled(Heading4)`
	margin-bottom: 0.8rem;
`;

export const PriceParagraph = styled(Paragraph)`
	margin-bottom: 2rem;
`;
