import { Product } from './productTypes';
import { useGetProductQuery } from './productApiSlice';

type Props = {
	productId: string;
};

const ProductView = ({ productId }: Props) => {
	const { isLoading, isError, data } = useGetProductQuery({ productId });

	const product = data?.getProduct;

	return isLoading ? (
		<div>Loading...</div>
	) : isError ? (
		<div>Error</div>
	) : (
		<div>
			<img src={product?.image} width="500px" />
			<h2>{product?.name}</h2>
			<p>{product?.price}</p>
		</div>
	);
};

export default ProductView;
