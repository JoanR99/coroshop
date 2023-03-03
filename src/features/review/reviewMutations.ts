import { gql } from 'graphql-request';

export const addReview = gql`
	mutation AddReview($productId: String!, $reviewBody: ReviewInput!) {
		addReview(productId: $productId, reviewBody: $reviewBody) {
			message
		}
	}
`;

export const deleteReview = gql`
	mutation DeleteReview($reviewId: String!) {
		deleteReview(reviewId: $reviewId) {
			message
		}
	}
`;
