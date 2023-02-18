import { Rating } from 'react-simple-star-rating';

import { Heading4 } from '../../components/Typography';
import { Review } from './reviewTypes';
import { CardBody, CardItem, CardReview } from '../../components/Card';

type Props = {
	review: Review;
};

const ReviewCard = ({ review }: Props) => (
	<CardReview>
		<CardBody>
			<CardItem>
				<Heading4>{review.authorName}</Heading4>
			</CardItem>
			<CardItem>
				<Rating
					ratingValue={0}
					initialValue={review.rating}
					size={22}
					readonly
				/>
			</CardItem>

			<CardItem>
				<p>{review.comment}</p>
			</CardItem>
		</CardBody>
	</CardReview>
);

export default ReviewCard;
