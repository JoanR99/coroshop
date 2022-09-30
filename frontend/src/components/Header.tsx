import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import jwtDecode from 'jwt-decode';
import { selectCurrentAccessToken } from '../features/auth/authSlice';
import LogoutButton from '../features/auth/LogoutButton';
import { LinkButton } from './Button';
import { StyledLinkDark3, StyledLinkDark4, LinkContainer } from './StyledLink';
import AdminButton from '../features/auth/AdminButton';
import { useAppSelector } from '../app/hooks';

const HeaderBody = styled.div`
	background-color: #f1faee;
	height: 5rem;
	padding: 1rem;
`;

const Container = styled.div`
	width: 90vw;
	margin: auto;
	display: flex;
	justify-content: space-between;
`;

const FlexDiv = styled.div`
	display: flex;
	justify-content: space-between;
	width: 18rem;
	align-items: center;
`;

const Header = () => {
	const accessToken = useAppSelector(selectCurrentAccessToken);

	const navigate = useNavigate();

	const clickHandler = () => navigate('profile');

	return (
		<HeaderBody>
			<Container>
				<StyledLinkDark3 to="/">COROSHOP</StyledLinkDark3>

				{accessToken ? (
					<FlexDiv>
						<LinkButton onClick={clickHandler}>Profile</LinkButton>
						<LogoutButton />
					</FlexDiv>
				) : (
					<LinkContainer>
						<StyledLinkDark4 to="/login">Login</StyledLinkDark4>

						<StyledLinkDark4 to="/register">Register</StyledLinkDark4>
					</LinkContainer>
				)}
			</Container>
		</HeaderBody>
	);
};

export default Header;
