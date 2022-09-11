import styled from 'styled-components';
import { StyledLinkLight5, LinkContainer } from './StyledLink';

const NavbarBody = styled.div`
	background-color: #457b9d;
	height: 5rem;
	padding: 1rem;
	margin-bottom: 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Navbar = () => {
	return (
		<NavbarBody>
			<LinkContainer>
				<StyledLinkLight5 to="/products">Products</StyledLinkLight5>
				<StyledLinkLight5 to="/categories">Categories</StyledLinkLight5>
			</LinkContainer>
		</NavbarBody>
	);
};

export default Navbar;
