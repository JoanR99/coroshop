import { getModelForClass } from '@typegoose/typegoose';
import { Product } from './Product';
import { Review } from './Review';

export const ProductModel = getModelForClass(Product);
export const ReviewModel = getModelForClass(Review);
