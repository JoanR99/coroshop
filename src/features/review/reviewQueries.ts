import { gql } from 'graphql-request';

export const getReviews = gql`
	query GetReviews($productId: String!) {
		getReviews(productId: $productId) {
			id
			comment
			rating
			author
			authorName
		}
	}
`;
