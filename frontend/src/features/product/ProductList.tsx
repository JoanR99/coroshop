import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from '../../components/Container';

import { useGetProductsQuery } from './productApiSlice';
import ProductCard from './ProductCard';
import Pagination from '../pagination/Pagination';
import { Heading2 } from '../../components/Typography';

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(10rem, 25rem));
	gap: 4rem;
	width: 100%;
	margin-top: 4rem;
	margin-bottom: 2rem;
`;

const ProductPageContainer = styled(Container)`
	min-height: 80vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 2rem;
`;

const ProductList = () => {
	const params = useParams();
	const navigate = useNavigate();
	const keyword = params.keyword ?? '';
	const pageNumber = Number(params.pageNumber ?? 1);
	const { isLoading, error, data } = useGetProductsQuery({
		pageNumber,
		pageSize: 1,
		keyword,
	});

	const pageChangeHandler = (page: number) => {
		const address = keyword
			? `/products/search/${keyword}/page/${page}`
			: `/products/page/${page}`;
		navigate(address);
	};

	return isLoading ? (
		<div>Is loading...</div>
	) : error ? (
		<div>Something went wrong</div>
	) : (
		<ProductPageContainer>
			<Grid>
				{data?.getProducts.products && data?.getProducts.products.length > 0 ? (
					data?.getProducts.products.map((product) => (
						<ProductCard product={product} key={product.id} />
					))
				) : (
					<Heading2>Product not found</Heading2>
				)}
			</Grid>
			<Pagination
				currentPage={pageNumber}
				siblingCount={3}
				totalPageCount={data!.getProducts.pages}
				onPageChange={pageChangeHandler}
			/>
		</ProductPageContainer>
	);
};

export default ProductList;
