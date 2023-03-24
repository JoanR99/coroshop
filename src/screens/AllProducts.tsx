import { useNavigate, useParams } from 'react-router-dom';

import { Container } from '../components/Container';
import {
	useGetProductOverviewListQuery,
	useGetProductsQuery,
} from '../features/product/productApiSlice';
import Pagination from '../features/pagination/Pagination';
import ProductList from '../features/product/ProductCardList';
import { Heading2 } from '../components/Typography';
import Spinner from '../components/Spinner';
import { styled } from '../../stitches.config';
import { selectFilters } from '../features/product/filterProductsSlice';
import { useAppSelector } from '../app/hooks';
import FilterCard from '../components/FilterCard';
import Flex from '../components/Flex';

const ProductListContainer = styled(Container, {
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	alignItems: 'center',
	minHeight: '58rem',
});

const AllProducts = () => {
	const params = useParams();
	const navigate = useNavigate();
	const pageNumber = Number(params.pageNumber ?? 1);
	const filters = useAppSelector(selectFilters);

	const { isLoading, error, data } = useGetProductOverviewListQuery({
		pageNumber,
		pageSize: 10,
		...filters,
	});

	const pageChangeHandler = (page: number) => {
		const address = `/products/page/${page}`;
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
					'@initial': 3,
					'@md': 4,
				}}
				css={{ my: '2rem' }}
			>
				All Products
			</Heading2>
			<Flex
				direction={{
					'@initial': 'column',
					'@lg': 'row',
				}}
				align={{
					'@initial': 'center',
					'@lg': 'start',
				}}
				gap={4}
				css={{ mb: '2rem' }}
			>
				<FilterCard />

				<ProductListContainer>
					<ProductList products={data!.getProducts.products} />
					<Pagination
						currentPage={pageNumber}
						siblingCount={3}
						totalPageCount={data!.getProducts.pages}
						onPageChange={pageChangeHandler}
					/>
				</ProductListContainer>
			</Flex>
		</Container>
	);
};

export default AllProducts;
