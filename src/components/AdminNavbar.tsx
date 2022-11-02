import styled from 'styled-components';
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

const AdminNavbar = () => {
	return (
		<NavbarBody>
			<Container>
				<LinkContainer>
					<StyledLinkLight5 to="/admin/product-list">
						Product List
					</StyledLinkLight5>
					<StyledLinkLight5 to="/admin/add-product">
						Add Product
					</StyledLinkLight5>
					<StyledLinkLight5 to="/admin/user-list">User List</StyledLinkLight5>
					<StyledLinkLight5 to="/admin/order-list">OrderList</StyledLinkLight5>
				</LinkContainer>
			</Container>
		</NavbarBody>
	);
};

export default AdminNavbar;
