import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { BsCheckLg } from 'react-icons/bs';
import { IoCloseSharp } from 'react-icons/io5';

import { EditButton, MainButton } from '../../components/Button';
import { Heading4, Paragraph } from '../../components/Typography';
import Pagination from '../pagination/Pagination';
import { useDeleteUserMutation, useGetUsersQuery } from './userApiSlice';
import { Table, Td, Th, Flex, TableContainer } from '../../components/Table';

const UsersTable = () => {
	const [pageNumber, setPageNumber] = useState(1);
	const { data, isLoading, error } = useGetUsersQuery({
		pageNumber,
		keyword: '',
		pageSize: 10,
	});
	const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();
	const navigate = useNavigate();

	const onPageChange = (page: number) => setPageNumber(page);

	const deleteHandler = async (userId: string) => {
		try {
			await deleteUser({ userId }).unwrap();
			toast.success('User deleted', { hideProgressBar: true, autoClose: 1000 });
		} catch (e) {
			toast.error('Error', { hideProgressBar: true, autoClose: 1000 });
		}
	};

	const editHandler = (userId: string) =>
		navigate(`/admin/user/${userId}/edit`);

	return isLoading ? (
		<div>Loading</div>
	) : data?.getUsers && data.getUsers.users.length > 0 ? (
		<TableContainer>
			<Table>
				<thead>
					<tr>
						<Th>
							<Heading4>ID</Heading4>
						</Th>
						<Th>
							<Heading4>Name</Heading4>
						</Th>
						<Th>
							<Heading4>Email</Heading4>
						</Th>
						<Th>
							<Heading4>Admin</Heading4>
						</Th>

						<Th></Th>
					</tr>
				</thead>
				<tbody>
					{data.getUsers.users.map((user) => (
						<tr key={user.id}>
							<Td>
								<Paragraph>{user.id}</Paragraph>
							</Td>
							<Td>
								<Paragraph>{user.name}</Paragraph>
							</Td>
							<Td>
								<Paragraph>${user.email}</Paragraph>
							</Td>

							<Td>
								<Paragraph>
									{user.isAdmin ? (
										<BsCheckLg style={{ color: 'green' }} />
									) : (
										<IoCloseSharp
											style={{ color: 'red', height: '20px', width: '20px' }}
										/>
									)}
								</Paragraph>
							</Td>

							<Td>
								<Flex>
									<EditButton onClick={() => editHandler(user.id)}>
										<FaEdit />
									</EditButton>
									<MainButton
										onClick={() => deleteHandler(user.id)}
										disabled={deleteLoading}
									>
										<MdDelete />
									</MainButton>
								</Flex>
							</Td>
						</tr>
					))}
				</tbody>
			</Table>
			<Pagination
				currentPage={pageNumber}
				siblingCount={2}
				totalPageCount={data.getUsers.pages}
				onPageChange={onPageChange}
			/>
		</TableContainer>
	) : (
		<Heading4>No Users to display</Heading4>
	);
};

export default UsersTable;
