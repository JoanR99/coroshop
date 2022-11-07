import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Container } from '../components/Container';
import { useGetProductsQuery } from '../features/product/productApiSlice';
import Pagination from '../features/pagination/Pagination';
import ProductList from '../features/product/ProducCardtList';
import { Heading3 } from '../components/Typography';

const ProductPageContainer = styled.div`
	min-height: 80vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 2rem;
`;

const CategoryProducts = () => {
	const params = useParams();
	const navigate = useNavigate();
	const keyword = params.keyword ?? '';
	const pageNumber = Number(params.pageNumber ?? 1);
	const category = params.category;
	const { isLoading, error, data } = useGetProductsQuery({
		pageNumber,
		pageSize: 12,
		keyword,
		category,
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
		<Container>
			<Heading3>{category}</Heading3>
			<ProductPageContainer>
				<ProductList products={data!.getProducts.products} />
				<Pagination
					currentPage={pageNumber}
					siblingCount={3}
					totalPageCount={data!.getProducts.pages}
					onPageChange={pageChangeHandler}
				/>
			</ProductPageContainer>
		</Container>
	);
};

export default CategoryProducts;
