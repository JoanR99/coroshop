import { Review } from '../models/Review';

import ReviewModel from '../models/Review';
import { ProductReview } from '../resolvers/ReviewResolvers';

export const create = (review: Partial<Review>) => ReviewModel.create(review);

export const findById = (reviewId: string) => ReviewModel.findById(reviewId);

export const findByProductId = (productId: string) =>
	ReviewModel.find({ product: productId });

export const findByIdAndUpdate = (
	reviewId: string,
	updateBody: ProductReview
) => ReviewModel.findByIdAndUpdate(reviewId, updateBody, { new: true });

export const destroy = (reviewId: string) =>
	ReviewModel.deleteOne({ id: reviewId });
