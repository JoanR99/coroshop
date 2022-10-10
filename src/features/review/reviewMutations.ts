import { gql } from 'graphql-request';

export const addReview = gql`
	mutation AddReview($productId: String!, $reviewBody: ReviewInput!) {
		addReview(productId: $productId, reviewBody: $reviewBody) {
			message
		}
	}
`;
