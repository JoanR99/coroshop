import styled from 'styled-components';
import { Container } from '../../components/Container';

import { useGetReviewsQuery } from './reviewApiSlice';
import ReviewCard from './ReviewCard';

type Props = { productId: string };

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
	gap: 4rem;
	width: 100%;
	margin-top: 2rem;
	margin-bottom: 4rem;
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
