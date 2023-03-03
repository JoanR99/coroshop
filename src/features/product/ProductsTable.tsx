import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEdit } from 'react-icons/fa';

import Button from '../../components/Button';
import { Heading4, Paragraph } from '../../components/Typography';
import Pagination from '../pagination/Pagination';
import {
	useDeleteProductMutation,
	useGetProductsQuery,
} from './productApiSlice';
import { Table, Td, Th, Flex, TableContainer } from '../../components/Table';
import DeleteDialog from '../../components/DeleteDialog';
import { styled } from '../../../stitches.config';

const EditIcon = styled(FaEdit, {
	height: '20px',
	width: '20px',
	color: '$main',
});

const EditButton = styled(Button, {
	padding: '0.5rem',
});

const ProductsTable = () => {
	const [pageNumber, setPageNumber] = useState(1);
	const { data, isLoading } = useGetProductsQuery({
		pageNumber,
		keyword: '',
		pageSize: 10,
	});
	const [deleteProduct, { isLoading: deleteLoading }] =
		useDeleteProductMutation();
	const navigate = useNavigate();

	const onPageChange = (page: number) => setPageNumber(page);

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

	const editHandler = (productId: string) =>
		navigate(`/admin/product/${productId}/edit`);

	return isLoading ? (
		<div>Loading</div>
	) : data!.getProducts.products.length > 0 ? (
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
							<Heading4>Price</Heading4>
						</Th>
						<Th>
							<Heading4>Category</Heading4>
						</Th>

						<Th>
							<Heading4>Brand</Heading4>
						</Th>
						<Th></Th>
					</tr>
				</thead>
				<tbody>
					{data!.getProducts.products.map((product) => (
						<tr key={product.id}>
							<Td>
								<Paragraph>{product.id}</Paragraph>
							</Td>
							<Td>
								<Paragraph>{product.name}</Paragraph>
							</Td>
							<Td>
								<Paragraph>${product.price}</Paragraph>
							</Td>

							<Td>
								<Paragraph>{product.category}</Paragraph>
							</Td>
							<Td>
								<Paragraph>{product.brand}</Paragraph>
							</Td>
							<Td>
								<Flex>
									<EditButton onClick={() => editHandler(product.id)}>
										<EditIcon />
									</EditButton>
									<DeleteDialog
										deleteHandler={() => deleteHandler(product.id)}
										loading={deleteLoading}
									/>
								</Flex>
							</Td>
						</tr>
					))}
				</tbody>
			</Table>
			<Pagination
				currentPage={pageNumber}
				siblingCount={2}
				totalPageCount={data!.getProducts.pages}
				onPageChange={onPageChange}
			/>
		</TableContainer>
	) : (
		<Heading4>No products to display</Heading4>
	);
};

export default ProductsTable;
