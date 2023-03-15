import { Rating } from 'react-simple-star-rating';

import { Heading4 } from '../../components/Typography';
import { Review } from './reviewTypes';
import { CardBody, CardItem, CardReview } from '../../components/Card';
import { useDeleteReviewMutation } from './reviewApiSlice';
import { toast } from 'react-toastify';
import { selectUserId } from '../auth/authSlice';
import { useAppSelector } from '../../app/hooks';
import ActionDialog, {
	DialogDescription,
	DialogTitle,
} from '../../components/ActionDialog';
import DeleteButton from '../../components/DeleteButton';

type Props = {
	review: Review;
	productId: string;
};

const ReviewCard = ({ review, productId }: Props) => {
	const [deleteReview, { isLoading }] = useDeleteReviewMutation();
	const userId = useAppSelector(selectUserId);

	const deleteReviewHandler = async () => {
		try {
			await deleteReview({ reviewId: review.id, productId }).unwrap();
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
						<ActionDialog
							mutationHandler={() => deleteReviewHandler()}
							loading={isLoading}
							button={<DeleteButton />}
							action="Delete"
						>
							<DialogTitle>Are you absolutely sure?</DialogTitle>
							<DialogDescription>
								This action cannot be undone. This will permanently delete the
								data from the servers.
							</DialogDescription>
						</ActionDialog>
					</CardItem>
				)}
			</CardBody>
		</CardReview>
	);
};

export default ReviewCard;
