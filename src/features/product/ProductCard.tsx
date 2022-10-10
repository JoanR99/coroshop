import { useNavigate } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';

import { Product } from './productTypes';
import { Heading4 } from '../../components/Typography';
import { Card, CardImage, CardBody, CardPrice } from '../../components/Card';

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
				<ul>
					<li>
						<Heading4>{product.name}</Heading4>
					</li>
					<li>
						<Rating
							ratingValue={0}
							initialValue={product.rating}
							size={22}
							readonly
						/>
					</li>
					<li>
						<CardPrice>$ {product.price}</CardPrice>
					</li>
				</ul>
			</CardBody>
		</Card>
	);
};

export default ProductCard;
