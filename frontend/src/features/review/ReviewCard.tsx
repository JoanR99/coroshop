import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Review } from './reviewTypes';

type Props = {
	review: Review;
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

const Rating = styled.p`
	font-size: 12px
	color: black;
	font-weight: 400;
`;

const CardBody = styled.div`
	padding: 10px;
`;

const ProductCard = ({ review }: Props) => (
	<Card>
		<CardBody>
			<CardTitle>{review.authorName}</CardTitle>
			<Rating>{review.rating}</Rating>
			<p>{review.comment}</p>
		</CardBody>
	</Card>
);

export default ProductCard;
