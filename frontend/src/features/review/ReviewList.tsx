import styled from 'styled-components';

import { useGetReviewsQuery } from './reviewApiSlice';
import ReviewCard from './ReviewCard';

type Props = { productId: string };

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(80px, 200px));
`;

const ReviewList = ({ productId }: Props) => {
	const { isLoading, error, data } = useGetReviewsQuery({
		productId,
	});

	return isLoading ? (
		<div>Is loading...</div>
	) : error ? (
		<div>Something went wrong</div>
	) : (
		<Grid>
			{data?.getReviews.map((review) => (
				<ReviewCard review={review} key={review.id} />
			))}
		</Grid>
	);
};

export default ReviewList;
