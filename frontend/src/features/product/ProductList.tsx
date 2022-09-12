import styled from 'styled-components';
import { Container } from '../../components/Container';

import { useGetProductsQuery } from './productApiSlice';
import ProductCard from './ProductCard';

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(10rem, 25rem));
	gap: 4rem;
	width: 100%;
	margin-top: 4rem;
`;

const ProductList = () => {
	const { isLoading, error, data } = useGetProductsQuery({
		pageNumber: 1,
		pageSize: 3,
		keyword: '',
	});

	return isLoading ? (
		<div>Is loading...</div>
	) : error ? (
		<div>Something went wrong</div>
	) : (
		<Container>
			<Grid>
				{data?.getProducts.products.map((product) => (
					<ProductCard product={product} key={product.id} />
				))}
			</Grid>
		</Container>
	);
};

export default ProductList;
