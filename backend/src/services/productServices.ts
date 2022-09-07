import ProductModel, { Product } from '../models/Product';
import { ProductBody } from '../resolvers/ProductResolvers';

type QueryProducts = { name: { $regex: string; $options: string } };

interface ProductUpdate extends Product {
	$inc: any;
}

export const findAll = (keyword: QueryProducts | {}) =>
	ProductModel.find({ ...keyword });

export const count = (keyword: QueryProducts | {}) =>
	ProductModel.countDocuments({ ...keyword });

export const findById = (id: string) => ProductModel.findById(id);

export const create = (product: ProductBody) => ProductModel.create(product);

export const remove = (id: string) => ProductModel.deleteOne({ id });

export const findByIdAndUpdate = (
	productId: string,
	productBody: Partial<ProductUpdate>
) =>
	ProductModel.findByIdAndUpdate(productId, { ...productBody }, { new: true });
