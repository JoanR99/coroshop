import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { selectCurrentAccessToken } from '../features/auth/authSlice';
import LogoutButton from '../features/auth/LogoutButton';
import { LinkButton } from './Button';
import { StyledLinkDark3, StyledLinkDark4, LinkContainer } from './StyledLink';

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
	width: 13rem;
`;

const Header = () => {
	const accessToken = selectCurrentAccessToken();

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
