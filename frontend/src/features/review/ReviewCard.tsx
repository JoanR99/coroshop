import styled from 'styled-components';
import { Heading4 } from '../../components/Typography';
import { Review } from './reviewTypes';
import { Rating } from 'react-simple-star-rating';

type Props = {
	review: Review;
};

const Card = styled.div`
	padding: 0;
	height: 20rem;
	border-radius: 0.3rem;
	box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.3);
	border-top: solid 0.5rem #a8dadc;
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

const ReviewCard = ({ review }: Props) => (
	<Card>
		<ul>
			<li>
				<Heading4>{review.authorName}</Heading4>
			</li>
			<li>
				<Rating
					ratingValue={0}
					initialValue={review.rating}
					size={22}
					readonly
				/>
			</li>

			<li>
				<p>{review.comment}</p>
			</li>
		</ul>
	</Card>
);

export default ReviewCard;
