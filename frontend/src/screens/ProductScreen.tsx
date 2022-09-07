import { useParams } from 'react-router-dom';
import { useGetProductQuery } from '../features/product/productApiSlice';
import ProductView from '../features/product/ProductView';

const ProductScreen = () => {
	const { id } = useParams();
	const { isLoading, isError, data } = useGetProductQuery({ productId: id! });

	console.log(data);

	return isLoading ? (
		<div>Loading...</div>
	) : isError ? (
		<div>Error</div>
	) : (
		<ProductView product={data!.getProduct} />
	);
};

export default ProductScreen;
