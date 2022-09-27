import styled from 'styled-components';
import CartDropDown from '../features/cart/CartDropDown';
import CartIcon from '../features/cart/CartIcon';
import { selectIsCartOpen } from '../features/cart/cartSlice';
import SearchBar from './SearchBar';
import { StyledLinkLight5, LinkContainer } from './StyledLink';

const NavbarBody = styled.div`
	background-color: #457b9d;
	height: 5rem;
	padding: 1rem;
`;

const Container = styled.div`
	width: 90vw;
	margin: auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Navbar = () => {
	const isCartOpen = selectIsCartOpen();
	return (
		<NavbarBody>
			<Container>
				<LinkContainer>
					<StyledLinkLight5 to="/products">Products</StyledLinkLight5>
					<StyledLinkLight5 to="/categories">Categories</StyledLinkLight5>
				</LinkContainer>
				<div>
					<SearchBar />
				</div>
				<div>
					<CartIcon />
					{isCartOpen && <CartDropDown />}
				</div>
			</Container>
		</NavbarBody>
	);
};

export default Navbar;
