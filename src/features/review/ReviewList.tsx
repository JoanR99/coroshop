import styled from 'styled-components';
import Spinner from '../../components/Spinner';

import { Heading2, Heading3 } from '../../components/Typography';
import { useGetReviewsQuery } from './reviewApiSlice';
import ReviewCard from './ReviewCard';

type Props = { productId: string };

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(20rem, 30rem));
	gap: 4rem;
	width: 100%;
	margin-top: 2rem;
	margin-bottom: 4rem;
	justify-content: center;
`;

const Heading = styled(Heading2)`
	margin-bottom: 2rem;
`;

const ReviewList = ({ productId }: Props) => {
	const { isLoading, error, data } = useGetReviewsQuery({
		productId,
	});

	return isLoading ? (
		<Spinner />
	) : error ? (
		<div>Something went wrong</div>
	) : (
		<div>
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
		</div>
	);
};

export default ReviewList;
