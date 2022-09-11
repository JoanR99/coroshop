import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectCurrentAccessToken } from '../features/auth/authSlice';
import LogoutButton from '../features/auth/LogoutButton';
import { StyledLinkDark3, StyledLinkDark4, LinkContainer } from './StyledLink';

const HeaderBody = styled.div`
	background-color: #f1faee;
	height: 5rem;
	padding: 1rem;
	color: #1d3557;
	display: flex;
	justify-content: space-between;
`;

const Header = () => {
	const accessToken = useSelector(selectCurrentAccessToken);

	return (
		<HeaderBody>
			<StyledLinkDark3 to="/">Coroshop</StyledLinkDark3>

			{accessToken ? (
				<LogoutButton />
			) : (
				<LinkContainer>
					<StyledLinkDark4 to="/login">Login</StyledLinkDark4>

					<StyledLinkDark4 to="/register">Register</StyledLinkDark4>
				</LinkContainer>
			)}
		</HeaderBody>
	);
};

export default Header;
