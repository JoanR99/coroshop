import { useNavigate } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';

import { Product } from './productTypes';
import { Heading4 } from '../../components/Typography';
import {
	Card,
	CardImage,
	CardBody,
	CardPrice,
	CardItem,
} from '../../components/Card';

type Props = {
	product: Pick<Product, 'id' | 'name' | 'image' | 'price' | 'rating'>;
};

const ProductCard = ({ product }: Props) => {
	const navigate = useNavigate();

	const handleClick = () => navigate(`/products/${product.id}`);

	return (
		<Card onClick={handleClick}>
			<CardImage src={product.image} />
			<CardBody>
				<CardItem>
					<Heading4>{product.name}</Heading4>
				</CardItem>
				<CardItem>
					<Rating
						ratingValue={0}
						initialValue={product.rating}
						size={22}
						readonly
					/>
				</CardItem>
				<CardItem>
					<CardPrice>$ {product.price}</CardPrice>
				</CardItem>
			</CardBody>
		</Card>
	);
};

export default ProductCard;
