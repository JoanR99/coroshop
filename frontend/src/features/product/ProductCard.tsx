import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Product } from './productTypes';
import { Rating } from 'react-simple-star-rating';
import { Heading4 } from '../../components/Typography';

type Props = {
	product: Pick<Product, 'id' | 'name' | 'image' | 'price' | 'rating'>;
};

const Card = styled.div`
	padding: 0;
	padding-bottom: 2rem;
	border-radius: 0.3rem;
	box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.15);
	transition: all 0.3s;
	cursor: pointer;

	&:hover {
		transform: translateY(-0.8rem) scale(1.03);
		box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.4);
	}
`;

const Price = styled.p`
	font-size: 12px;
	color: gray;
`;

const CardImage = styled.img`
	width: 100%;
	margin: 0;
	min-height: 50%;
`;

const CardBody = styled.div`
	ul {
		list-style: none;
		width: 80%;
		margin: 0 auto;

		li {
			text-align: center;
			font-size: 1.5rem;
			padding: 0.5rem;
		}
	}
`;

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
						<Price>$ {product.price}</Price>
					</li>
				</ul>
			</CardBody>
		</Card>
	);
};

export default ProductCard;
