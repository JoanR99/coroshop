import SearchBar from './SearchBar';
import StyledLink from './StyledLink';
import { selectIsAdmin } from '../features/auth/authSlice';
import { useAppSelector } from '../app/hooks';
import { styled, css } from '../../stitches.config';
import CartDropDown from '../features/cart/CartDropDown';
import { Container } from './Container';
import Flex from './Flex';

export const navbarCss = css({
	variants: {
		size: {
			small: {
				height: '3.5rem',
				padding: '0.5rem',
			},
			normal: {
				height: '5rem',
				padding: '1rem',
			},
		},
		color: {
			main: {
				backgroundColor: '$main',
			},
			light: {
				backgroundColor: '$light',
			},
		},
	},
});

const NavbarBody = styled('div', navbarCss);

const NavbarContainer = styled(Container, {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	height: '100%',
});

const Navbar = () => {
	const isAdmin = useAppSelector(selectIsAdmin);
	return (
		<NavbarBody
			size={{
				'@initial': 'small',
				'@sm': 'normal',
			}}
			color="main"
		>
			<NavbarContainer>
				<Flex
					justify="between"
					align="center"
					gap={{
						'@initial': 1,
						'@sm': 2,
					}}
				>
					<StyledLink
						to="/products"
						theme="light"
						fontSize={{
							'@initial': 1,
							'@sm': 2,
						}}
					>
						Products
					</StyledLink>
					<StyledLink
						to="/categories"
						theme="light"
						fontSize={{
							'@initial': 1,
							'@sm': 2,
						}}
					>
						Categories
					</StyledLink>
					{isAdmin && (
						<StyledLink
							to="/admin/product-list"
							theme="light"
							fontSize={{
								'@initial': 1,
								'@sm': 2,
							}}
						>
							Admin
						</StyledLink>
					)}
				</Flex>
				<div>
					<SearchBar />
				</div>
				<CartDropDown />
			</NavbarContainer>
		</NavbarBody>
	);
};

export default Navbar;
