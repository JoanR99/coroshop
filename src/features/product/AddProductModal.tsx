import ModalDialog from '../../components/ModalDialog';
import AddProductForm from './AddProductForm';
import Button from '../../components/Button';
import useModal from '../../hooks/modal';

const AddProductModal = () => {
	const { isOpen, toggleModal, closeModal } = useModal();

	return (
		<ModalDialog
			title="Add Product"
			open={isOpen}
			toggleModal={toggleModal}
			button={
				<Button
					variant="add"
					size={{
						'@initial': 'small',
						'@md': 'normal',
					}}
					fontSize="1"
				>
					Add Product
				</Button>
			}
		>
			<AddProductForm closeModal={closeModal} />
		</ModalDialog>
	);
};

export default AddProductModal;
