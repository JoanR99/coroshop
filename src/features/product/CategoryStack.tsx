import { StyledLink4 } from '../../components/StyledLink';
import { Heading3 } from '../../components/Typography';
import { useGetProductsQuery } from './productApiSlice';
import ProductCard from './ProductCard';
import { styled } from '../../../stitches.config';

const StackContainer = styled('div', {
	backgroundColor: '$main_light',
	padding: '2rem',
	borderRadius: '30px',

	variants: {
		margin: {
			top: {
				mt: '4rem',
			},
		},
	},
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

const CategoryStack = ({
	category,
	title,
	margin,
	productId,
}: {
	category: string;
	title?: string;
	margin?: 'top';
	productId?: string;
}) => {
	const { data } = useGetProductsQuery({
		pageSize: 4,
		pageNumber: 1,
		keyword: '',
		category,
	});

	const products = productId
		? data?.getProducts.products.filter((product) => product.id != productId)
		: data?.getProducts.products;

	return (
		<StackContainer margin={margin}>
			<Heading3>{title ? title : category}</Heading3>
			<Grid>
				{products?.map((product) => (
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
