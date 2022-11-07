import styled from 'styled-components';

export const Card = styled.div`
	min-height: 34rem;
	padding: 0;
	padding-bottom: 2rem;
	border-radius: 0.3rem;
	box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.15);
	transition: all 0.3s;
	cursor: pointer;
	background-color: white;

	&:hover {
		transform: translateY(-0.8rem) scale(1.03);
		box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.4);
	}
`;

export const CardPrice = styled.p`
	font-size: 12px;
	color: gray;
`;

export const CardImage = styled.img`
	width: 100%;
	margin: 0;
	min-height: 50%;
`;

export const CardBody = styled.div`
	ul {
		list-style: none;
		width: 80%;
		margin: 0 auto;

		li {
			text-align: center;
			font-size: 1.5rem;
			padding: 0.5rem;
		}
	}
`;

export const CardReview = styled.div`
	padding: 0;
	height: 20rem;
	border-radius: 0.3rem;
	box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.3);
	border-top: solid 0.5rem #a8dadc;
	ul {
		list-style: none;
		width: 80%;
		margin: 0 auto;

		li {
			text-align: center;
			font-size: 1.5rem;
			padding: 0.5rem;
		}
	}
`;
