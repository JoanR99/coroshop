import { gql } from 'graphql-request';

export const addProduct = gql`
	mutation AdProduct($product: ProductBody!) {
		addProduct(product: $product) {
			id
			name
			image
			rating
			price
		}
	}
`;
