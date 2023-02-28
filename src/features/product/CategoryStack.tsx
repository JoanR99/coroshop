import { StyledLink4 } from '../../components/StyledLink';
import { Heading3 } from '../../components/Typography';
import { useGetProductsQuery } from './productApiSlice';
import ProductCard from './ProductCard';
import { styled } from '../../../stitches.config';

const StackContainer = styled('div', {
	backgroundColor: '$main_light',
	padding: '2rem',
	borderRadius: '30px',
});

const LinkDiv = styled('div', {
	alignSelf: 'center',
});

const Grid = styled('div', {
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 18rem))',
	gap: '4rem',
	width: '100%',
	mt: '4rem',
	mb: '2rem',
	justifyContent: 'center',
});

const CategoryStack = ({ category }: { category: string }) => {
	const { data } = useGetProductsQuery({
		pageSize: 4,
		pageNumber: 1,
		keyword: '',
		category,
	});

	return (
		<StackContainer>
			<Heading3>{category}</Heading3>
			<Grid>
				{data?.getProducts.products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
				<LinkDiv>
					<StyledLink4 to={`/categories/${category}`} theme="dark">
						View more
					</StyledLink4>
				</LinkDiv>
			</Grid>
		</StackContainer>
	);
};

export default CategoryStack;
