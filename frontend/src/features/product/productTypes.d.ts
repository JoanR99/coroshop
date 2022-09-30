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

export type CardProduct = Pick<
	Product,
	'id' | 'name' | 'image' | 'rating' | 'price' | 'category' | 'brand'
>;

export type GetProductsResponse = {
	getProducts: {
		products: CardProduct[];
		page: number;
		pages: number;
	};
};

export type GetProductResponse = {
	getProduct: Product;
};

export type AddProductResponse = {
	addProduct: Product;
};

export type AddProductInput = Omit<Product, 'id' | 'rating' | 'numReviews'>;

export type DeleteProductInput = { productId: string };

export type DeleteProductResponse = {
	deleteProduct: { message: string };
};
