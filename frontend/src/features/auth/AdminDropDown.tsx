import styled from 'styled-components';
import { StyledLinkDark5 } from '../../components/StyledLink';

const DropDownContainer = styled.div`
	position: absolute;
	width: 15rem;
	height: 10rem;
	display: flex;
	flex-direction: column;
	background-color: white;
	top: 90px;
	left: 275px;
	z-index: 5;
	box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.2);
`;

const DropDownItems = styled.div`
	height: 10rem;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

type Props = {
	toggleOpen: () => void;
};

const AdminDropDown = ({ toggleOpen }: Props) => {
	return (
		<DropDownContainer>
			<DropDownItems onClick={toggleOpen}>
				<StyledLinkDark5 to="/admin/add-product">Add Product</StyledLinkDark5>
				<StyledLinkDark5 to="/admin/product-list">Product List</StyledLinkDark5>
				<StyledLinkDark5 to="/admin/user-list">User List</StyledLinkDark5>
			</DropDownItems>
		</DropDownContainer>
	);
};

export default AdminDropDown;
