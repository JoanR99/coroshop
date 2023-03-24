import { Container } from '../components/Container';
import { Heading2 } from '../components/Typography';
import { useGetProductsGroupedByCategoryQuery } from '../features/product/productApiSlice';
import ProductStack from '../features/product/ProductStack';
import Spinner from '../components/Spinner';
import Flex from '../components/Flex';

const Categories = () => {
	const { data, isLoading, isError } =
		useGetProductsGroupedByCategoryQuery(null);
	return isLoading ? (
		<Spinner />
	) : isError ? (
		<div>Something went wrong</div>
	) : (
		<Container css={{ mb: '2rem' }}>
			<Heading2
				size={{
					'@initial': 3,
					'@md': 4,
				}}
				css={{ my: '2rem' }}
			>
				Categories
			</Heading2>
			<Flex direction="column" gap={5}>
				{data?.getProductsGroupedByCategory.map((categoryProducts) => (
					<ProductStack
						category={categoryProducts.category}
						products={categoryProducts.products}
						key={categoryProducts.category}
					/>
				))}
			</Flex>
		</Container>
	);
};

export default Categories;
