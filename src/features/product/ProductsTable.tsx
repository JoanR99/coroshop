import { useState } from 'react';
import { toast } from 'react-toastify';

import { Heading4, Paragraph } from '../../components/Typography';
import Pagination from '../pagination/Pagination';
import {
	useDeleteProductMutation,
	useGetProductsQuery,
} from './productApiSlice';
import { Table, Td, Th, Flex, TableContainer } from '../../components/Table';
import ActionDialog, {
	DialogDescription,
	DialogTitle,
} from '../../components/ActionDialog';
import EditProductModal from './EditProductModal';
import DeleteButton from '../../components/DeleteButton';

const ProductsTable = () => {
	const [pageNumber, setPageNumber] = useState(1);
	const { data, isLoading } = useGetProductsQuery({
		pageNumber,
		keyword: '',
		pageSize: 10,
	});
	const [deleteProduct, { isLoading: deleteLoading }] =
		useDeleteProductMutation();

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
									<EditProductModal productId={product.id} />
									<ActionDialog
										mutationHandler={() => deleteHandler(product.id)}
										loading={deleteLoading}
										button={<DeleteButton />}
										action="Delete"
									>
										<DialogTitle>Are you absolutely sure?</DialogTitle>
										<DialogDescription>
											This action cannot be undone. This will permanently delete
											the data from the servers.
										</DialogDescription>
									</ActionDialog>
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
