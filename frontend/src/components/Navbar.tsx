import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentAccessToken } from '../features/auth/authSlice';
import LogoutButton from '../features/auth/LogoutButton';

const NavbarBody = styled.div`
	background-color: #2b2727;
	padding: 1rem;
	color: white;
	margin-bottom: 20px;
	display: flex;
	justify-content: space-between;
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

const Navbar = () => {
	const accessToken = useSelector(selectCurrentAccessToken);

	return (
		<NavbarBody>
			<StyledLink to="/">Coroshop</StyledLink>

			{accessToken ? (
				<LogoutButton />
			) : (
				<StyledLink to="/login">Login</StyledLink>
			)}
		</NavbarBody>
	);
};

export default Navbar;
