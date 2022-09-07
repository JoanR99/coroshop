import styled from 'styled-components';

import { useGetProductsQuery } from './productApiSlice';
import ProductCard from './ProductCard';

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(80px, 200px));
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
		<Grid>
			{data?.getProducts.products.map((product) => (
				<ProductCard product={product} key={product.id} />
			))}
		</Grid>
	);
};

export default ProductList;
