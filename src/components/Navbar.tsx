import styled from 'styled-components';

import SearchBar from './SearchBar';
import { StyledLink5, LinkContainer } from './StyledLink';
import CartNavbar from '../features/cart/CartNavbar';
import { selectIsAdmin } from '../features/auth/authSlice';
import { useAppSelector } from '../app/hooks';

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
				<CartNavbar />
			</Container>
		</NavbarBody>
	);
};

export default Navbar;
