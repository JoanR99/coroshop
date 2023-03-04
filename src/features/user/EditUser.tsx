import EditDialog from '../../components/EditDialog';
import EditUserForm from './EditUserForm';
import { useState } from 'react';

const EditUser = ({ userId }: { userId: string }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleModal = () => setIsOpen((prevValue) => !prevValue);
	const closeModal = () => setIsOpen(false);

	return (
		<EditDialog title="Edit User" open={isOpen} toggleModal={toggleModal}>
			<EditUserForm userId={userId} closeModal={closeModal} />
		</EditDialog>
	);
};

export default EditUser;
