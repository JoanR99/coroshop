import ModalDialog from '../../components/ModalDialog';
import EditUserForm from './EditUserForm';
import EditButton from '../../components/EditButton';
import useModal from '../../hooks/modal';

const EditUserModal = ({ userId }: { userId: string }) => {
	const { isOpen, toggleModal, closeModal } = useModal();

	return (
		<ModalDialog
			title="Edit User"
			open={isOpen}
			toggleModal={toggleModal}
			button={<EditButton />}
		>
			<EditUserForm userId={userId} closeModal={closeModal} />
		</ModalDialog>
	);
};

export default EditUserModal;
