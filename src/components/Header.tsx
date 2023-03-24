import { useNavigate } from 'react-router-dom';

import { styled } from '../../stitches.config';
import { selectCurrentAccessToken } from '../features/auth/authSlice';
import LogoutButton from '../features/auth/LogoutButton';
import Button from './Button';
import StyledLink from './StyledLink';
import { useAppSelector } from '../app/hooks';
import { Container } from './Container';
import Flex from './Flex';
import { navbarCss } from './Navbar';

const HeaderBody = styled('div', navbarCss, {
	'&.shadow': {
		boxShadow: '0 1.5rem 4rem rgba(0, 0, 0, 0.2)',
	},
});

type Props = {
	shadow: boolean;
};

const Header = ({ shadow }: Props) => {
	const accessToken = useAppSelector(selectCurrentAccessToken);

	const navigate = useNavigate();

	const clickHandler = () => navigate('profile');

	return (
		<HeaderBody
			className={`${shadow ? 'shadow' : ''}`}
			size={{
				'@initial': 'small',
				'@sm': 'normal',
			}}
			color="light"
		>
			<Container css={{ display: 'flex', justifyContent: 'space-between' }}>
				<StyledLink
					to="/"
					theme="dark"
					fontSize={{
						'@initial': 2,
						'@sm': 3,
					}}
					fontWeight="bold"
				>
					COROSHOP
				</StyledLink>

				{accessToken ? (
					<Flex justify="between" align="center">
						<Button
							variant="linkLight"
							onClick={clickHandler}
							fontWeight="bold"
							fontSize={{
								'@initial': 1,
								'@sm': 2,
							}}
							size={{
								'@initial': 'small',
								'@sm': 'normal',
							}}
						>
							Profile
						</Button>
						<LogoutButton />
					</Flex>
				) : (
					<Flex
						justify="between"
						align="center"
						gap={{ '@initial': 1, '@sm': 2 }}
					>
						<StyledLink
							to="/login"
							theme="dark"
							fontWeight="bold"
							fontSize={{
								'@initial': 1,
								'@sm': 2,
							}}
						>
							Login
						</StyledLink>

						<StyledLink
							to="/register"
							theme="dark"
							fontWeight="bold"
							fontSize={{
								'@initial': 1,
								'@sm': 2,
							}}
						>
							Register
						</StyledLink>
					</Flex>
				)}
			</Container>
		</HeaderBody>
	);
};

export default Header;
