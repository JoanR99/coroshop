import { toast } from 'react-toastify';
import ActionDialog, {
	DialogDescription,
	DialogTitle,
} from '../../components/ActionDialog';
import DeleteButton from '../../components/DeleteButton';
import { useDeleteUserMutation } from './userApiSlice';

const DeleteUser = ({ userId }: { userId: string }) => {
	const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();

	const deleteHandler = async (userId: string) => {
		try {
			await deleteUser({ userId }).unwrap();
			toast.success('User deleted', { hideProgressBar: true, autoClose: 1000 });
		} catch (e) {
			toast.error('Error', { hideProgressBar: true, autoClose: 1000 });
		}
	};

	return (
		<ActionDialog
			mutationHandler={() => deleteHandler(userId)}
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

export default DeleteUser;
