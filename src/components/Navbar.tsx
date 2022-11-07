import styled from 'styled-components';

import SearchBar from './SearchBar';
import { StyledLinkLight5, LinkContainer } from './StyledLink';
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
					<StyledLinkLight5 to="/products">Products</StyledLinkLight5>
					<StyledLinkLight5 to="/categories">Categories</StyledLinkLight5>
					{isAdmin && (
						<StyledLinkLight5 to="/admin/product-list">Admin</StyledLinkLight5>
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
