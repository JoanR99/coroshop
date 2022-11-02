import styled from 'styled-components';

import { Heading2 } from './Typography';

export const Container = styled.div`
	width: 90%;
	margin: auto;
`;

export const StyledContainer = styled.div`
	border-top: solid 1rem #a8dadc;
	border-radius: 1rem;
	padding: 2rem;
	box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.2);
`;

export const FlexContainer = styled(Container)`
	margin-top: 4rem;
	margin-bottom: 4rem;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
`;

export const InfoContainer = styled(StyledContainer)`
	width: 63%;
`;

export const SummaryContainer = styled(StyledContainer)`
	width: 33%;
`;

export const ContainerHeading = styled(Heading2)`
	margin-bottom: 1.5rem;
`;

export const MarginContainer = styled(StyledContainer)`
	max-width: 60rem;
	margin: auto;
`;
