import ProductModel, { Product, Review } from '../models/Product';
import { ProductBody } from '../resolvers/ProductResolvers';
import { DocumentType } from '@typegoose/typegoose';

type QueryProducts = { name: { $regex: string; $options: string } };

export const findAll = (keyword: QueryProducts | {}) =>
	ProductModel.find({ ...keyword });

export const count = (keyword: QueryProducts | {}) =>
	ProductModel.countDocuments({ ...keyword });

export const findById = (id: string) => ProductModel.findById(id);

export const create = (product: ProductBody) => ProductModel.create(product);

export const remove = (id: string) => ProductModel.deleteOne({ id });

export const update = async (
	product: DocumentType<Product>,
	productBody: ProductBody
) => {
	product.name = productBody.name;
	product.brand = productBody.brand;
	product.price = productBody.price;
	product.countInStock = productBody.countInStock;
	product.category = productBody.category;
	product.image = productBody.image;
	product.description = productBody.description;

	await product.save();
};

export const addReview = async (
	product: DocumentType<Product>,
	review: Review
) => {
	product.reviews.push(review);
	product.numReviews = product.reviews.length;
	product.rating =
		product.reviews.reduce((acc, item) => item.rating + acc, 0) /
		product.reviews.length;

	await product.save();
};
