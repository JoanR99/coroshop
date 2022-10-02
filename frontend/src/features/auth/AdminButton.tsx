import { useState } from 'react';
import styled from 'styled-components';

import AdminDropDown from './AdminDropDown';
import { LinkButtonDark } from '../../components/Button';
import { selectIsAdmin } from './authSlice';
import { useAppSelector } from '../../app/hooks';

const LinkText = styled.p`
	font-size: 1.6rem;
	font-weight: 400;
`;

const AdminButton = () => {
	const [isOpen, setIsOpen] = useState(false);
	const isAdmin = useAppSelector(selectIsAdmin);

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
