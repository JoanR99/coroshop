import { useState } from 'react';
import AdminDropDown from './AdminDropDown';
import { LinkButtonDark } from '../../components/Button';
import styled from 'styled-components';
import { selectCurrentAccessToken, selectIsAdmin } from './authSlice';
import jwtDecode from 'jwt-decode';

const LinkText = styled.p`
	font-size: 1.6rem;
	font-weight: 400;
`;

const AdminButton = () => {
	const [isOpen, setIsOpen] = useState(false);
	const isAdmin = selectIsAdmin();

	const toggleOpen = () => setIsOpen((open) => !open);

	return isAdmin ? (
		<>
			<LinkButtonDark onClick={toggleOpen}>
				<LinkText>Admin</LinkText>
			</LinkButtonDark>
			{isOpen && <AdminDropDown toggleOpen={toggleOpen} />}
		</>
	) : null;
};

export default AdminButton;
