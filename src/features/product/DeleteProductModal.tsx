import { toast } from 'react-toastify';
import ActionDialog, {
	DialogDescription,
	DialogTitle,
} from '../../components/ActionDialog';
import DeleteButton from '../../components/DeleteButton';
import { useDeleteProductMutation } from './productApiSlice';

const DeleteProductModal = ({ productId }: { productId: string }) => {
	const [deleteProduct, { isLoading: deleteLoading }] =
		useDeleteProductMutation();

	const deleteHandler = async (productId: string) => {
		try {
			await deleteProduct({ productId }).unwrap();
			toast.success('Product deleted', {
				hideProgressBar: true,
				autoClose: 1000,
			});
		} catch (e) {
			toast.error('Error', { hideProgressBar: true, autoClose: 1000 });
		}
	};

	return (
		<ActionDialog
			mutationHandler={() => deleteHandler(productId)}
			loading={deleteLoading}
			button={<DeleteButton />}
			action="Delete"
		>
			<DialogTitle>Are you absolutely sure?</DialogTitle>
			<DialogDescription>
				This action cannot be undone. This will permanently delete the data from
				the servers.
			</DialogDescription>
		</ActionDialog>
	);
};

export default DeleteProductModal;
