import { NotFound } from '../errors';
import ProductModel, { Product } from '../models/Product';
import { ProductBody } from '../Types/productTypes';
import * as reviewService from './reviewService';

type QueryProducts = { name: { $regex: string; $options: string } };

interface ProductUpdate extends Product {
	$inc?: any;
}

interface ProductCreateBody extends ProductBody {
	createdBy: string;
}

export const findAll = (keyword: QueryProducts | {}) =>
	ProductModel.find({ ...keyword });

export const count = (keyword: QueryProducts | {}) =>
	ProductModel.countDocuments({ ...keyword });

export const findById = (id: string) => ProductModel.findById(id);

export const create = (product: ProductCreateBody) =>
	ProductModel.create(product);

export const remove = (id: string) => ProductModel.findByIdAndDelete(id);

export const findByIdAndUpdate = (
	productId: string,
	productBody: Partial<ProductUpdate>
) =>
	ProductModel.findByIdAndUpdate(productId, { ...productBody }, { new: true });

export const updateRating = async (productId: string) => {
	const product = await ProductModel.findById(productId);

	if (!product) throw new NotFound('Product not found');

	const currentReviewsOfProduct = await reviewService.findByProductId(
		product.id
	);

	if (currentReviewsOfProduct.length > 0) {
		const newRatingOfProduct =
			currentReviewsOfProduct.reduce(
				(acc: number, review) => review?.rating + acc,
				0
			) / product.numReviews;

		product.rating = newRatingOfProduct;
		await product.save();
	} else {
		product.rating = 0;
		await product.save();
	}
};

export const updateNumReviews = async (productId: string) => {
	const product = await ProductModel.findById(productId);

	if (!product) throw new NotFound('Product not found');

	const currentReviewsOfProduct = await reviewService.findByProductId(
		product.id
	);

	product.numReviews = currentReviewsOfProduct.length;
	await product.save();
};
