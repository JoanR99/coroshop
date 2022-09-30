import { gql } from 'graphql-request';

export const getProducts = gql`
	query GetProducts($pageSize: Float!, $keyword: String!, $pageNumber: Float!) {
		getProducts(
			pageSize: $pageSize
			keyword: $keyword
			pageNumber: $pageNumber
		) {
			page
			pages
			products {
				id
				name
				image
				rating
				price
				category
				brand
			}
		}
	}
`;

export const getProduct = gql`
	query GetProduct($productId: String!) {
		getProduct(productId: $productId) {
			id
			name
			image
			brand
			category
			description
			rating
			numReviews
			price
			countInStock
		}
	}
`;
