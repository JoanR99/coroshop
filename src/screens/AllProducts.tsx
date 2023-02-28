import { useNavigate, useParams } from 'react-router-dom';

import { Container } from '../components/Container';
import { useGetProductsQuery } from '../features/product/productApiSlice';
import Pagination from '../features/pagination/Pagination';
import ProductList from '../features/product/ProductCardList';
import { Heading2 } from '../components/Typography';
import Spinner from '../components/Spinner';
import { styled } from '../../stitches.config';

const ProductPageContainer = styled(Container, {
	minHeight: '80vh',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	alignItems: 'center',
	mb: '2rem',
});

const MarginTopHeading = styled(Heading2, {
	mt: '2rem',
});

const AllProducts = () => {
	const params = useParams();
	const navigate = useNavigate();
	const keyword = params.keyword ?? '';
	const pageNumber = Number(params.pageNumber ?? 1);
	const { isLoading, error, data } = useGetProductsQuery({
		pageNumber,
		pageSize: 12,
		keyword,
	});

	const pageChangeHandler = (page: number) => {
		const address = keyword
			? `/products/search/${keyword}/page/${page}`
			: `/products/page/${page}`;
		navigate(address);
	};

	return isLoading ? (
		<Spinner />
	) : error ? (
		<div>Something went wrong</div>
	) : (
		<Container>
			<MarginTopHeading>All Products</MarginTopHeading>
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

export default AllProducts;
