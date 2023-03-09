import Spinner from '../../components/Spinner';

import { Heading2, Heading3 } from '../../components/Typography';
import { useGetReviewsQuery } from './reviewApiSlice';
import ReviewCard from './ReviewCard';
import { styled } from '../../../stitches.config';

type Props = { productId: string };

const Grid = styled('div', {
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 30rem))',
	gap: '4rem',
	width: '100%',
	mt: '2rem',
	mb: '4rem',
	justifyContent: 'center',
});

const Heading = styled(Heading2, {
	mb: '2rem',
});

const ReviewsContainer = styled('div', {
	mt: '4rem',
});

const ReviewList = ({ productId }: Props) => {
	const { isLoading, error, data } = useGetReviewsQuery({
		productId,
	});

	return isLoading ? (
		<Spinner />
	) : error ? (
		<ReviewsContainer>Something went wrong</ReviewsContainer>
	) : (
		<ReviewsContainer>
			<Heading>Reviews</Heading>
			<Grid>
				{data?.getReviews && data?.getReviews.length > 0 ? (
					data?.getReviews.map((review) => (
						<ReviewCard review={review} key={review.id} />
					))
				) : (
					<Heading3>No one reviewed this product yet</Heading3>
				)}
			</Grid>
		</ReviewsContainer>
	);
};

export default ReviewList;
