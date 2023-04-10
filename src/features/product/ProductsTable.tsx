import { useState } from 'react';

import { Heading4, Paragraph } from '../../components/Typography';
import Pagination from '../pagination/Pagination';
import { useGetProductsQuery } from './productApiSlice';
import { Table, Td, Th, TableContainer } from '../../components/Table';
import EditProductModal from './EditProductModal';
import DeleteProductModal from './DeleteProductModal';
import Flex from '../../components/Flex';

const ProductsTable = () => {
	const [pageNumber, setPageNumber] = useState(1);
	const { data, isLoading } = useGetProductsQuery({
		pageNumber,
		keyword: '',
		pageSize: 10,
	});

	const onPageChange = (page: number) => setPageNumber(page);

	return isLoading ? (
		<div>Loading</div>
	) : data!.getProducts.products.length > 0 ? (
		<TableContainer css={{ minWidth: '58rem' }}>
			<Table>
				<thead>
					<tr>
						<Th>
							<Heading4
								size={{
									'@initial': '1',
									'@md': '2',
								}}
							>
								Name
							</Heading4>
						</Th>
						<Th>
							<Heading4
								size={{
									'@initial': '1',
									'@md': '2',
								}}
							>
								Price
							</Heading4>
						</Th>
						<Th>
							<Heading4
								size={{
									'@initial': '1',
									'@md': '2',
								}}
							>
								Category
							</Heading4>
						</Th>

						<Th>
							<Heading4
								size={{
									'@initial': '1',
									'@md': '2',
								}}
							>
								Brand
							</Heading4>
						</Th>
						<Th></Th>
					</tr>
				</thead>
				<tbody>
					{data!.getProducts.products.map((product) => (
						<tr key={product.id}>
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
								<Flex justify="center" gap="1">
									<EditProductModal productId={product.id} />
									<DeleteProductModal productId={product.id} />
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
