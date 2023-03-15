import { Container } from '../components/Container';
import { Heading2 } from '../components/Typography';
import CategoryStack from '../features/product/CategoryStack';
import { styled } from '../../stitches.config';
import { useGetProductsGroupedByCategoryQuery } from '../features/product/productApiSlice';
import ProductStack from '../features/product/ProductStack';
import Spinner from '../components/Spinner';

const CATEGORIES = ['Phones', 'Laptops', 'Accessories', 'TV'];

const FlexColumn = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	gap: '6rem',
});

const MarginHeading = styled(Heading2, {
	margin: '2rem 0',
});

const Categories = () => {
	const { data, isLoading, isError } =
		useGetProductsGroupedByCategoryQuery(null);
	return isLoading ? (
		<Spinner />
	) : isError ? (
		<div>Something went wrong</div>
	) : (
		<Container space="bottom">
			<MarginHeading>Categories</MarginHeading>
			<FlexColumn>
				{data?.getProductsGroupedByCategory.map((categoryProducts) => (
					<ProductStack
						category={categoryProducts.category}
						products={categoryProducts.products}
						key={categoryProducts.category}
					/>
				))}
			</FlexColumn>
		</Container>
	);
};

export default Categories;
