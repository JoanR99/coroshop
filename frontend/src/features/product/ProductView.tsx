import { Product } from './productTypes';

type Props = {
	product: Product;
};

const ProductView = ({ product }: Props) => {
	console.log(product);
	return (
		<div>
			<img src={product.image} width="500px" />
			<h2>{product.name}</h2>
			<p>{product.price}</p>
		</div>
	);
};

export default ProductView;
