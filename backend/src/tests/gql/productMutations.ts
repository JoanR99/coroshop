import { gql } from 'apollo-server-express';

export const addProductMutation = gql`
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
	mutation UpdateProduct($productBody: ProductBody!, $productId: String!) {
		updateProduct(productBody: $productBody, productId: $productId) {
			id
			name
			image
			rating
			price
		}
	}
`;
