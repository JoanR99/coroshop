import { Review } from '../models/Review';
import { ProductModel } from '../models/ProductReview';

import { ReviewModel } from '../models/ProductReview';
import { ProductReview } from '../resolvers/ReviewResolvers';

export const create = (review: Partial<Review>) => ReviewModel.create(review);

export const findById = (reviewId: string) => ReviewModel.findById(reviewId);

export const findByProductId = (productId: string) =>
	ReviewModel.find({ product: productId });

export const addReview = async (productId: string, reviewId: string) => {
	const product = await ProductModel.findByIdAndUpdate(
		productId,
		{
			$push: { reviews: reviewId },
			$inc: { numReviews: 1 },
		},
		{ new: true }
	);

	const reviewsOfProduct = await ReviewModel.find({ product: productId });

	if (product) {
		const ratingOfProduct =
			reviewsOfProduct.reduce(
				(acc: number, review: Review) => review?.rating + acc,
				0
			) / product.numReviews;

		product.rating = ratingOfProduct;

		await product.save();
	}

	return product;
};

export const findByIdAndUpdate = async (
	reviewId: string,
	updateBody: ProductReview
) => {
	const updatedReview = await ReviewModel.findByIdAndUpdate(
		reviewId,
		updateBody,
		{ new: true }
	);

	if (updatedReview) {
		const reviewsOfProduct = await ReviewModel.find({
			product: updatedReview.product,
		});
		const ratingOfProduct =
			reviewsOfProduct.reduce(
				(acc: number, review: Review) => review.rating + acc,
				0
			) / reviewsOfProduct.length;

		await ProductModel.findByIdAndUpdate(updatedReview.product, {
			rating: ratingOfProduct,
		});
	}

	return updatedReview;
};

export const findByIdAndDelete = async (reviewId: string) => {
	const deletedReview = await ReviewModel.findByIdAndDelete(reviewId);

	if (deletedReview) {
		const reviewsOfProduct = await ReviewModel.find({
			product: deletedReview.product,
		});

		const ratingOfProduct =
			reviewsOfProduct.length > 0
				? reviewsOfProduct.reduce(
						(acc: number, review: Review) => review.rating + acc,
						0
				  ) / reviewsOfProduct.length
				: 0;

		const product = await ProductModel.findById(deletedReview.product);

		if (product) {
			const index = product?.reviews.indexOf(deletedReview.id);

			product.reviews.splice(index, 1);
			(product.rating = ratingOfProduct),
				(product.numReviews = reviewsOfProduct.length),
				await product.save();
		}
	}

	return deletedReview;
};
