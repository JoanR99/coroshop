import ModalDialog from '../../components/ModalDialog';
import EditProductForm from './EditProductForm';
import EditButton from '../../components/EditButton';
import useModal from '../../hooks/modal';

const EditProductModal = ({ productId }: { productId: string }) => {
	const { isOpen, toggleModal, closeModal } = useModal();

	return (
		<ModalDialog
			title="Edit Product"
			open={isOpen}
			toggleModal={toggleModal}
			button={<EditButton />}
		>
			<EditProductForm productId={productId} closeModal={closeModal} />
		</ModalDialog>
	);
};

export default EditProductModal;
