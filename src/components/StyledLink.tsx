import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
	text-decoration: none;
`;

export const StyledLink1 = styled(StyledLink)`
	font-size: 3rem;
	font-weight: bold;
`;

export const StyledLink2 = styled(StyledLink)`
	font-size: 2.4rem;
	font-weight: bold;
`;

export const StyledLink3 = styled(StyledLink)`
	font-size: 1.9rem;
	font-weight: bold;
`;

export const StyledLink4 = styled(StyledLink)`
	font-size: 1.6rem;
	font-weight: bold;
`;

export const StyledLink5 = styled(StyledLink)`
	font-size: 1.6rem;
	font-weight: regular;
`;

export const StyledLinkDark1 = styled(StyledLink1)`
	color: #1d3557;

	&:visited,
	&:active {
		color: #1d3557;
	}

	&:hover {
		color: #e63946;
	}
`;

export const StyledLinkLight1 = styled(StyledLink1)`
	color: #f1faee;

	&:visited,
	&:active {
		color: #f1faee;
	}

	&:hover {
		color: #e63946;
	}
`;

export const StyledLinkDark2 = styled(StyledLink2)`
	color: #1d3557;

	&:visited,
	&:active {
		color: #1d3557;
	}

	&:hover {
		color: #e63946;
	}
`;

export const StyledLinkLight2 = styled(StyledLink2)`
	color: #f1faee;

	&:visited,
	&:active {
		color: #f1faee;
	}

	&:hover {
		color: #e63946;
	}
`;

export const StyledLinkDark3 = styled(StyledLink3)`
	color: #1d3557;

	&:visited,
	&:active {
		color: #1d3557;
	}

	&:hover {
		color: #e63946;
	}
`;

export const StyledLinkLight3 = styled(StyledLink3)`
	color: #f1faee;

	&:visited,
	&:active {
		color: #f1faee;
	}

	&:hover {
		color: #e63946;
	}
`;

export const StyledLinkDark4 = styled(StyledLink4)`
	color: #1d3557;

	&:visited,
	&:active {
		color: #1d3557;
	}

	&:hover {
		color: #e63946;
	}
`;

export const StyledLinkLight4 = styled(StyledLink4)`
	color: #f1faee;

	&:visited,
	&:active {
		color: #f1faee;
	}

	&:hover {
		color: #e63946;
	}
`;

export const StyledLinkDark5 = styled(StyledLink5)`
	color: #1d3557;

	&:visited,
	&:active {
		color: #1d3557;
	}

	&:hover {
		color: #e63946;
	}
`;

export const StyledLinkLight5 = styled(StyledLink5)`
	color: #f1faee;

	&:visited,
	&:active {
		color: #f1faee;
	}

	&:hover {
		color: #e63946;
	}
`;

export const LinkContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 2rem;
`;
