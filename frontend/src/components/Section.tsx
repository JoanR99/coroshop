import styled, { css } from 'styled-components';

import { Heading3, Heading2 } from './Typography';

export const SectionContainer = styled.section`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 58.2rem;
`;

export const SectionPartText = styled.div`
	width: 48%;
`;

export const SectionPartImage = styled.div`
	width: 48%;
	height: 100%;
`;

export const Section = styled.div`
	&:not(:last-child) {
		border-bottom: 1px solid #a8dadc;
		margin-bottom: 2rem;
		padding-bottom: 2rem;
	}
`;

export const SectionHeading = styled(Heading3)`
	margin-bottom: 1rem;
`;

export const AuthSection = styled(SectionContainer)`
	background-color: #a8dadc;
	height: 86vh;
`;

export const FormSection = styled(SectionPartText)`
	background-color: #a8dadc;
	height: 100%;
	display: grid;
	place-items: center;
`;

interface SectionImageProps {
	readonly img: string;
}

export const SectionImage = styled(SectionPartImage)<SectionImageProps>`
	${(props) => css`
		background-image: linear-gradient(
				to right,
				rgba(102, 212, 82, 0),
				rgba(33, 175, 128, 0),
				rgba(33, 175, 128, 0),
				rgba(33, 175, 128, 0),
				rgba(33, 175, 128, 0),
				rgba(33, 175, 128, 0),
				rgba(168, 218, 220, 0.9),
				rgba(168, 218, 220, 1)
			),
			url(${props.img});
		background-size: cover;
	`}
`;

export const MarginHeading = styled(Heading2)`
	margin-bottom: 2rem;
`;
