import { Review } from '../review/reviewTypes';

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

type ProductOverview = {
	id: string;
	name: string;
	image: string;
	rating: number;
	price: number;
};

type ProductInfo = Product & {
	similarProducts: ProductOverview[];
	reviews: Review[];
};

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
	getProduct: ProductInfo;
};

export type AddProductResponse = {
	addProduct: Product;
};

export type AddProductInput = Omit<Product, 'id' | 'rating' | 'numReviews'>;

export type DeleteProductInput = { productId: string };

export type DeleteProductResponse = {
	deleteProduct: { message: string };
};

export type UpdateProductInput = {
	productBody: Omit<Product, 'id' | 'rating' | 'numReviews'>;
	productId: string;
};

export type UpdateProductResponse = {
	updateProduct: Product;
};

type ProductsByCategory = {
	category: string;
	products: Product[];
};

export type GetProductsGroupedByCategoryResponse = {
	getProductsGroupedByCategory: ProductsByCategory[];
};
