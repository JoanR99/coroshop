import styled from 'styled-components';

export const Button = styled.button`
	border-radius: 5rem;
	padding: 1rem 2rem;
	border: none;
	cursor: pointer;
`;

export const MainButton = styled(Button)`
	background-color: #e63946;
	color: #f1faee;
`;

export const GhostButton = styled(Button)`
	background-color: #f1faee;
	color: #e63946;
	border: none;
	font-size: 2rem;
`;

export const LinkButton = styled.button`
	border: none;
	font-size: 1.6rem;
	font-weight: bold;
	cursor: pointer;

	color: #1d3557;

	&:hover {
		color: #e63946;
	}
`;

export const LinkButtonDark = styled.button`
	border: none;
	font-size: 1.6rem;
	font-weight: bold;
	cursor: pointer;
	background-color: #457b9d;

	color: #f1faee;

	&:hover {
		color: #e63946;
	}
`;

export const SearchButton = styled(Button)`
	background-color: #a8dadc;
	padding: 0.5rem 1rem;
`;
