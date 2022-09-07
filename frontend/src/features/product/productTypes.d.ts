export interface Product {
	id: string;
	name: string;
	image: string;
	brand: string;
	category: string;
	description: string;
	rating: number;
	numReviews: number;
	price: number;
	countInStock: number;
}

export interface GetProductsResponse {
	getProducts: {
		products: Pick<Product, 'id' | 'name' | 'image' | 'rating' | 'price'>[];
		page: number;
		pages: number;
	};
}

export interface GetProductResponse {
	getProduct: Product;
}
