import styled from 'styled-components';
import { Heading4 } from '../../components/Typography';
import { Review } from './reviewTypes';
import { Rating } from 'react-simple-star-rating';
import { CardReview } from '../../components/Card';

type Props = {
	review: Review;
};

const ReviewCard = ({ review }: Props) => (
	<CardReview>
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
	</CardReview>
);

export default ReviewCard;
