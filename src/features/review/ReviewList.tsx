import { Heading2, Heading3 } from '../../components/Typography';
import ReviewCard from './ReviewCard';
import { styled } from '../../../stitches.config';
import { Review } from './reviewTypes';

type Props = { reviews: Review[] };

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

const ReviewList = ({ reviews }: Props) => {
	return (
		<ReviewsContainer>
			<Heading>Reviews</Heading>
			<Grid>
				{reviews.length > 0 ? (
					reviews.map((review) => (
						<ReviewCard
							review={review}
							productId={review.product}
							key={review.id}
						/>
					))
				) : (
					<Heading3>No one reviewed this product yet</Heading3>
				)}
			</Grid>
		</ReviewsContainer>
	);
};

export default ReviewList;
