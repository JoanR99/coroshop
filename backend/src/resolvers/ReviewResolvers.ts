import { ApolloError } from 'apollo-server-express';
import {
	Arg,
	Ctx,
	Mutation,
	Resolver,
	UseMiddleware,
	Query,
} from 'type-graphql';

import { NotFound } from '../errors';
import verifyJwt from '../middlewares/verifyJwt';
import { MyContext } from '../MyContext';
import * as productService from '../services/productServices';
import * as userService from '../services/userService';
import * as reviewService from '../services/reviewService';
import { Review } from '../models/Review';
import { MutationBasicResponse, ProductReview } from '../Types/reviewTypes';

@Resolver()
export class ReviewResolver {
	@Query(() => [Review])
	async getReviews(@Arg('productId') productId: string) {
		const reviews = await reviewService.findByProductId(productId);

		return reviews;
	}

	@Mutation(() => MutationBasicResponse)
	@UseMiddleware(verifyJwt)
	async addReview(
		@Arg('reviewBody') reviewBody: ProductReview,
		@Arg('productId') productId: string,
		@Ctx() { payload }: MyContext
	) {
		const product = await productService.findById(productId);

		if (!product) {
			throw new NotFound('Product not found');
		}

		const reviewsOfProduct = await reviewService.findByProductId(product.id);

		const alreadyReviewed = reviewsOfProduct.find(
			(review) => review?.author?.toString() === payload?.userId
		);

		if (alreadyReviewed) {
			throw new ApolloError('Product already reviewed');
		}

		const user = await userService.findById(payload!.userId);

		await reviewService.create({
			rating: reviewBody.rating,
			comment: reviewBody.comment,
			author: user?.id,
			authorName: user?.name,
			product: product.id,
		});

		product.numReviews = product.numReviews + 1;

		const currentReviewsOfProduct = await reviewService.findByProductId(
			product.id
		);

		const newRatingOfProduct =
			currentReviewsOfProduct.reduce(
				(acc: number, review: Review) => review?.rating + acc,
				0
			) / product.numReviews;

		product.rating = newRatingOfProduct;

		await product.save();

		return {
			message: 'Review added',
		};
	}

	@Mutation(() => Review)
	@UseMiddleware(verifyJwt)
	async updateReview(
		@Arg('reviewId') reviewId: string,
		@Arg('updateBody') updateBody: ProductReview,
		@Ctx() { payload }: MyContext
	) {
		const review = await reviewService.findById(reviewId);

		if (!review) {
			throw new NotFound('Review not found');
		}

		if (review?.author?.toString() !== payload?.userId) {
			throw new ApolloError('You are not authorized to perform this action');
		}

		const updatedReview = await reviewService.findByIdAndUpdate(
			reviewId,
			updateBody
		);

		if (updatedReview) {
			const reviewsOfProduct = await reviewService.findByProductId(
				updatedReview.product!.toString()
			);

			const ratingOfProduct =
				reviewsOfProduct.reduce(
					(acc: number, review: Review) => review.rating + acc,
					0
				) / reviewsOfProduct.length;

			await productService.findByIdAndUpdate(
				updatedReview.product!.toString(),
				{
					rating: ratingOfProduct,
				}
			);
		}

		return updatedReview;
	}

	@Mutation(() => MutationBasicResponse)
	@UseMiddleware(verifyJwt)
	async deleteReview(
		@Arg('reviewId') reviewId: string,
		@Ctx() { payload }: MyContext
	) {
		const review = await reviewService.findById(reviewId);

		if (!review) {
			throw new NotFound('Review not found');
		}

		if (review?.author?.toString() !== payload?.userId) {
			throw new ApolloError('You are not authorized to perform this action');
		}

		await reviewService.destroy(reviewId);

		const reviewsOfProduct = await reviewService.findByProductId(
			review.product!.toString()
		);

		const ratingOfProduct =
			reviewsOfProduct.length > 0
				? reviewsOfProduct.reduce(
						(acc: number, review: Review) => review.rating + acc,
						0
				  ) / reviewsOfProduct.length
				: 0;

		const product = await productService.findByIdAndUpdate(
			review.product!.toString(),
			{ rating: ratingOfProduct, $inc: { numReviews: -1 } }
		);

		if (product) {
			(product.rating = ratingOfProduct),
				(product.numReviews = reviewsOfProduct.length),
				await product.save();
		}

		return {
			message: 'Review deleted',
		};
	}
}
