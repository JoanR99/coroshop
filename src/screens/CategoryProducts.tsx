import { useNavigate, useParams } from 'react-router-dom';

import { Container } from '../components/Container';
import { useGetProductsQuery } from '../features/product/productApiSlice';
import Pagination from '../features/pagination/Pagination';
import ProductList from '../features/product/ProductCardList';
import { Heading2 } from '../components/Typography';
import Spinner from '../components/Spinner';
import { styled } from '../../stitches.config';

const ProductPageContainer = styled('div', {
	minHeight: '80vh',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	alignItems: 'center',
	mb: '2rem',
});

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
		<Spinner />
	) : error ? (
		<div>Something went wrong</div>
	) : (
		<Container>
			<Heading2
				size={{
					'@initial': '3',
					'@md': '4',
				}}
				css={{ my: '2rem' }}
			>
				{category}
			</Heading2>
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
