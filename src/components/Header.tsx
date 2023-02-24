import { useNavigate } from 'react-router-dom';

import { styled } from '../../stitches.config';
import { selectCurrentAccessToken } from '../features/auth/authSlice';
import LogoutButton from '../features/auth/LogoutButton';
import Button from './Button';
import { StyledLink3, StyledLink4, LinkContainer } from './StyledLink';
import { useAppSelector } from '../app/hooks';
import { Container } from './Container';

const HeaderBody = styled('div', {
	backgroundColor: '#f1faee',
	height: '5rem',
	padding: '1rem',

	'&.shadow': {
		boxShadow: '0 1.5rem 4rem rgba(0, 0, 0, 0.2)',
	},
});

const HeaderContainer = styled(Container, {
	display: 'flex',
	justifyContent: 'space-between',
});

const FlexDiv = styled('div', {
	display: 'flex',
	justifyContent: 'space-between',
	width: '18rem',
	alignItems: 'center',
});

type Props = {
	shadow: boolean;
};

const Header = ({ shadow }: Props) => {
	const accessToken = useAppSelector(selectCurrentAccessToken);

	const navigate = useNavigate();

	const clickHandler = () => navigate('profile');

	return (
		<HeaderBody className={`${shadow ? 'shadow' : ''}`}>
			<HeaderContainer>
				<StyledLink3 to="/" theme="dark">
					COROSHOP
				</StyledLink3>

				{accessToken ? (
					<FlexDiv>
						<Button variant="linkLight" onClick={clickHandler}>
							Profile
						</Button>
						<LogoutButton />
					</FlexDiv>
				) : (
					<LinkContainer>
						<StyledLink4 to="/login" theme="dark">
							Login
						</StyledLink4>

						<StyledLink4 to="/register" theme="dark">
							Register
						</StyledLink4>
					</LinkContainer>
				)}
			</HeaderContainer>
		</HeaderBody>
	);
};

export default Header;
