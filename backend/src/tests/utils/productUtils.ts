import ProductModel, { Product } from '../../models/Product';

export type GetProductsInput = {
	pageSize?: any;
	pageNumber?: any;
	keyword?: any;
};

export type GetProductsResponse = {
	getProducts: {
		products: Product[];
		pages: number;
		page: number;
	};
};

export const createProducts = async (
	productsNumber: number = 1,
	createdBy: string,
	createdByName: string
) => {
	for (let i = 0; i < productsNumber; i++) {
		await ProductModel.create({
			name: `product${i}`,
			description: `description${i}`,
			price: i * 100,
			image: `/image${i}`,
			brand: `brand${i}`,
			category: `category${i}`,
			countInStock: i * 20,
			createdBy,
			createdByName,
		});
	}
};

export const findProduct = (id: string) => ProductModel.findById(id);
