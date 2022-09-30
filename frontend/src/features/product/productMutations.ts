import { gql } from 'graphql-request';

export const addProduct = gql`
	mutation AddProduct($product: ProductBody!) {
		addProduct(product: $product) {
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
