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
