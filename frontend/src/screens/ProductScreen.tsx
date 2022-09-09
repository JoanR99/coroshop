import { useParams } from 'react-router-dom';
import ProductView from '../features/product/ProductView';
import ReviewList from '../features/review/ReviewList';
import AddReview from '../features/review/AddReview';

const ProductScreen = () => {
	const { id } = useParams();

	return (
		<>
			<ProductView productId={id!} />
			<AddReview productId={id!} />
			<ReviewList productId={id!} />
		</>
	);
};

export default ProductScreen;
