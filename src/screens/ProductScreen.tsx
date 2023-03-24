import { useParams } from 'react-router-dom';

import ProductView from '../features/product/ProductView';
import ReviewList from '../features/review/ReviewList';
import AddReview from '../features/review/AddReview';
import { selectCurrentAccessToken } from '../features/auth/authSlice';
import { Container } from '../components/Container';
import { useAppSelector } from '../app/hooks';
import { useGetProductQuery } from '../features/product/productApiSlice';
import Spinner from '../components/Spinner';
import ProductStack from '../features/product/ProductStack';

const ProductScreen = () => {
	const { id } = useParams();
	const accessToken = useAppSelector(selectCurrentAccessToken);
	const { isLoading, isError, data } = useGetProductQuery({ productId: id! });

	return isLoading ? (
		<Spinner />
	) : isError ? (
		<div>Error</div>
	) : (
		<Container>
			<ProductView product={data?.getProduct!} />
			<ProductStack
				category={data?.getProduct!.category}
				products={data?.getProduct!.similarProducts!}
				title="Similar products"
			/>
			{accessToken && <AddReview productId={id!} />}
			<ReviewList reviews={data?.getProduct.reviews!} />
		</Container>
	);
};

export default ProductScreen;
