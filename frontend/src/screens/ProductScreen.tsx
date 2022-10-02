import { useParams } from 'react-router-dom';

import ProductView from '../features/product/ProductView/ProductView';
import ReviewList from '../features/review/ReviewList';
import AddReview from '../features/review/AddReview';
import { selectCurrentAccessToken } from '../features/auth/authSlice';
import { Container } from '../components/Container';
import { useAppSelector } from '../app/hooks';

const ProductScreen = () => {
	const { id } = useParams();
	const accessToken = useAppSelector(selectCurrentAccessToken);

	return (
		<Container>
			<ProductView productId={id!} />
			{accessToken && <AddReview productId={id!} />}
			<ReviewList productId={id!} />
		</Container>
	);
};

export default ProductScreen;
