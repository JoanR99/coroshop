import { Rating } from 'react-simple-star-rating';

import { Heading4 } from '../../components/Typography';
import { Review } from './reviewTypes';
import { CardBody, CardItem, CardReview } from '../../components/Card';
import DeleteDialog from '../../components/DeleteDialog';
import { useDeleteReviewMutation } from './reviewApiSlice';
import { toast } from 'react-toastify';
import { selectUserId } from '../auth/authSlice';
import { useAppSelector } from '../../app/hooks';

type Props = {
	review: Review;
};

const ReviewCard = ({ review }: Props) => {
	const [deleteReview, { isLoading }] = useDeleteReviewMutation();
	const userId = useAppSelector(selectUserId);

	const deleteReviewHandler = async () => {
		try {
			await deleteReview({ reviewId: review.id }).unwrap();
			toast.success('Review deleted', {
				hideProgressBar: true,
				autoClose: 1000,
			});
		} catch (e) {
			toast.error('Error', { hideProgressBar: true, autoClose: 1000 });
		}
	};

	return (
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

				{review.author == userId && (
					<CardItem>
						<DeleteDialog
							deleteHandler={() => deleteReviewHandler()}
							loading={isLoading}
						/>
					</CardItem>
				)}
			</CardBody>
		</CardReview>
	);
};

export default ReviewCard;
