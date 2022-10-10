import { gql } from 'graphql-request';

export const addProduct = gql`
	mutation AddProduct($addProductInput: AddProductInput!) {
		addProduct(addProductInput: $addProductInput) {
			id
			name
			image
			rating
			price
		}
	}
`;

export const deleteProduct = gql`
	mutation DeleteProduct($productId: String!) {
		deleteProduct(productId: $productId) {
			message
		}
	}
`;

export const updateProduct = gql`
	mutation UpdateProduct($productBody: AddProductInput!, $productId: String!) {
		updateProduct(productBody: $productBody, productId: $productId) {
			id
			name
			image
			rating
			price
		}
	}
`;
