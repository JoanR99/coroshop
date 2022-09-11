import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Product } from './productTypes';

type Props = {
	product: Pick<Product, 'id' | 'name' | 'image' | 'price' | 'rating'>;
};

const Card = styled.div`
	padding: 0;
	border: 1px solid black;
`;

const CardTitle = styled.h2`
	text-align: center;
	font-size: 15px;
	color: black;
`;

const Price = styled.p`
	font-size: 12px;
	color: gray;
`;

const Rating = styled.p`
	font-size: 12px
	color: black;
	font-weight: 400;
`;

const CardImage = styled.img`
	width: 100%;
	margin: 0;
`;

const CardBody = styled.div`
	padding: 10px;
`;

const ProductCard = ({ product }: Props) => {
	const navigate = useNavigate();

	const handleClick = () => navigate(`/products/${product.id}`);

	return (
		<Card onClick={handleClick}>
			<CardImage src={product.image} />
			<CardBody>
				<CardTitle>{product.name}</CardTitle>
				<Rating>{product.rating}</Rating>
				<Price>$ {product.price}</Price>
			</CardBody>
		</Card>
	);
};

export default ProductCard;
