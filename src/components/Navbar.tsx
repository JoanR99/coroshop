import SearchBar from './SearchBar';
import { StyledLink5, LinkContainer } from './StyledLink';
import { selectIsAdmin } from '../features/auth/authSlice';
import { useAppSelector } from '../app/hooks';
import { styled } from '../../stitches.config';
import CartDropDown from '../features/cart/CartDropDown';
import { Container } from './Container';

const NavbarBody = styled('div', {
	backgroundColor: '$main',
	height: '5rem',
	padding: '1rem',
});

const NavbarContainer = styled(Container, {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
});

const Navbar = () => {
	const isAdmin = useAppSelector(selectIsAdmin);
	return (
		<NavbarBody>
			<NavbarContainer>
				<LinkContainer>
					<StyledLink5 to="/products" theme="light">
						Products
					</StyledLink5>
					<StyledLink5 to="/categories" theme="light">
						Categories
					</StyledLink5>
					{isAdmin && (
						<StyledLink5 to="/admin/product-list" theme="light">
							Admin
						</StyledLink5>
					)}
				</LinkContainer>
				<div>
					<SearchBar />
				</div>
				<CartDropDown />
			</NavbarContainer>
		</NavbarBody>
	);
};

export default Navbar;
