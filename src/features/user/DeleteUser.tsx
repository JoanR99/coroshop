import { toast } from 'react-toastify';

import DeleteDialog from '../../components/DeleteDialog';
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
		<DeleteDialog
			deleteHandler={() => deleteHandler(userId)}
			loading={deleteLoading}
		/>
	);
};

export default DeleteUser;
