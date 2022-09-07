import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavbarBody = styled.div`
	background-color: #2b2727;
	padding: 1rem;
	color: white;
	margin-bottom: 20px;
`;

const StyledLink = styled(Link)`
	color: white;

	&:visited,
	&:active {
		color: white;
	}

	&:hover {
		color: blue;
	}

	text-decoration: none;
`;

const Navbar = () => (
	<NavbarBody>
		<StyledLink to="/">Coroshop</StyledLink>
	</NavbarBody>
);

export default Navbar;
