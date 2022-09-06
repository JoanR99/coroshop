import { ProductModel } from '../models/ProductReview';
import { ProductBody } from '../resolvers/ProductResolvers';

type QueryProducts = { name: { $regex: string; $options: string } };

export const findAll = (keyword: QueryProducts | {}) =>
	ProductModel.find({ ...keyword });

export const count = (keyword: QueryProducts | {}) =>
	ProductModel.countDocuments({ ...keyword });

export const findById = (id: string) => ProductModel.findById(id);

export const create = (product: ProductBody) => ProductModel.create(product);

export const remove = (id: string) => ProductModel.deleteOne({ id });

export const findByIdAndUpdate = (
	productId: string,
	productBody: ProductBody
) =>
	ProductModel.findByIdAndUpdate(productId, { ...productBody }, { new: true });
