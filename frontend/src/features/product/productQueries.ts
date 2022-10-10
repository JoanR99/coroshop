import { gql } from 'graphql-request';

export const getProducts = gql`
	query GetProducts($getProductsInput: GetItemsInput!) {
		getProducts(getProductsInput: $getProductsInput) {
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
