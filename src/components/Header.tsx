import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { selectCurrentAccessToken } from '../features/auth/authSlice';
import LogoutButton from '../features/auth/LogoutButton';
import { LinkButton } from './Button';
import { StyledLinkDark3, StyledLinkDark4, LinkContainer } from './StyledLink';
import { useAppSelector } from '../app/hooks';

const HeaderBody = styled.div<{ shadow: boolean }>`
	background-color: #f1faee;
	height: 5rem;
	padding: 1rem;
	${(props) =>
		props.shadow
			? css`
					box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.2);
			  `
			: ''}
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

type Props = {
	shadow: boolean;
};

const Header = ({ shadow }: Props) => {
	const accessToken = useAppSelector(selectCurrentAccessToken);

	const navigate = useNavigate();

	const clickHandler = () => navigate('profile');

	return (
		<HeaderBody shadow={shadow}>
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
