import { gql } from 'graphql-request';

export const addReview = gql`
	mutation AddReview($productId: String!, $reviewBody: ProductReview!) {
		addReview(productId: $productId, reviewBody: $reviewBody) {
			message
		}
	}
`;
