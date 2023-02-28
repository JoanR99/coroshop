import ProductCard from './ProductCard';
import { Heading2 } from '../../components/Typography';
import { CardProduct } from './productTypes';
import { styled } from '../../../stitches.config';

const Grid = styled('div', {
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 18rem))',
	gap: '4rem',
	width: '100%',
	my: '2rem',
	justifyContent: 'center',
});

type Props = {
	products: CardProduct[];
};

const ProductList = ({ products }: Props) => (
	<Grid>
		{products.length > 0 ? (
			products.map((product) => (
				<ProductCard product={product} key={product.id} />
			))
		) : (
			<Heading2>Product not found</Heading2>
		)}
	</Grid>
);

export default ProductList;
