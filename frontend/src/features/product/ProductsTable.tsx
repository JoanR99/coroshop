import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { MainButton } from '../../components/Button';
import { Heading4, Paragraph } from '../../components/Typography';
import Pagination from '../pagination/Pagination';
import {
	useDeleteProductMutation,
	useGetProductsQuery,
} from './productApiSlice';

const Table = styled.table`
	width: 100%;
	padding: 1rem;
`;

const Th = styled.th`
	width: 16%;
`;

const Td = styled.td`
	width: 16%;
	text-align: center;
	padding: 0.5rem;
`;

const Flex = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-around;
`;

const TableContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
`;

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
			console.log(productId);
			await deleteProduct({ productId }).unwrap();
			toast.success('Product deleted');
		} catch (e) {
			console.log(e);
			toast.error('Error');
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
									<MainButton onClick={() => editHandler(product.id)}>
										Edit
									</MainButton>
									<MainButton
										onClick={() => deleteHandler(product.id)}
										disabled={deleteLoading}
									>
										Delete
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
				totalPageCount={data!.getProducts.pages}
				onPageChange={onPageChange}
			/>
		</TableContainer>
	) : (
		<Heading4>No products to display</Heading4>
	);
};

export default ProductsTable;
