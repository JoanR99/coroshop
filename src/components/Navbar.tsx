import SearchBar from './SearchBar';
import { StyledLink5, LinkContainer } from './StyledLink';
import { selectIsAdmin } from '../features/auth/authSlice';
import { useAppSelector } from '../app/hooks';
import { styled } from '../../stitches.config';
import CartDropDown from '../features/cart/CartDropDown';

const NavbarBody = styled('div', {
	backgroundColor: '$main',
	height: '5rem',
	padding: '1rem',
});

const Container = styled('div', {
	width: '90vw',
	margin: 'auto',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
});

const Navbar = () => {
	const isAdmin = useAppSelector(selectIsAdmin);
	return (
		<NavbarBody>
			<Container>
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
			</Container>
		</NavbarBody>
	);
};

export default Navbar;
