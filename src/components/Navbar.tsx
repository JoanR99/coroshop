import styled from 'styled-components';

import SearchBar from './SearchBar';
import { StyledLinkLight5, LinkContainer } from './StyledLink';
import AdminButton from '../features/auth/AdminButton';
import CartNavbar from '../features/cart/CartNavbar';

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
	return (
		<NavbarBody>
			<Container>
				<LinkContainer>
					<StyledLinkLight5 to="/products">Products</StyledLinkLight5>
					<StyledLinkLight5 to="/categories">Categories</StyledLinkLight5>
					<AdminButton />
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
