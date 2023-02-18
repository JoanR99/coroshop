import styled from 'styled-components';

import ProductCard from './ProductCard';
import { Heading2 } from '../../components/Typography';
import { CardProduct } from './productTypes';

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(12rem, 18rem));
	gap: 4rem;
	width: 100%;
	margin-top: 2rem;
	margin-bottom: 2rem;
	justify-content: center;
`;

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
