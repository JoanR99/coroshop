import { ApolloError } from 'apollo-server-express';
import {
	Arg,
	Ctx,
	Mutation,
	Resolver,
	UseMiddleware,
	InputType,
	ObjectType,
	Field,
} from 'type-graphql';
import { NotFound } from '../errors';
import verifyJwt from '../middlewares/verifyJwt';
import { MyContext } from '../MyContext';

import * as productService from '../services/productServices';
import * as userService from '../services/userService';
import * as reviewService from '../services/reviewService';
import { Review } from '../models/Review';

@InputType()
export class ProductReview {
	@Field()
	rating: number;

	@Field()
	comment: string;
}

@ObjectType()
class MutationBasicResponse {
	@Field()
	message: string;
}

@Resolver()
export class ReviewResolver {
	@Mutation(() => MutationBasicResponse)
	@UseMiddleware(verifyJwt)
	async addReview(
		@Arg('reviewBody') reviewBody: ProductReview,
		@Arg('productId') productId: string,
		@Ctx() { payload }: MyContext
	) {
		const product = await productService
			.findById(productId)
			.populate('reviews');

		if (!product) {
			throw new NotFound('Product not found');
		}

		const reviewsOfProduct = await reviewService.findByProductId(product.id);

		const alreadyReviewed = reviewsOfProduct.find(
			(review) => review?.user?.toString() === payload?.userId
		);

		if (alreadyReviewed) {
			throw new ApolloError('Product already reviewed');
		}

		const user = await userService.findById(payload!.userId);

		const review = await reviewService.create({
			rating: reviewBody.rating,
			comment: reviewBody.comment,
			user: user?.id,
			product: product.id,
		});

		await reviewService.addReview(productId, review.id);

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

		if (review?.user?.toString() !== payload?.userId) {
			throw new ApolloError('You are not authorized to perform this action');
		}

		const updatedReview = await reviewService.findByIdAndUpdate(
			reviewId,
			updateBody
		);

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

		if (review?.user?.toString() !== payload?.userId) {
			throw new ApolloError('You are not authorized to perform this action');
		}

		await reviewService.findByIdAndDelete(reviewId);

		return {
			message: 'Review deleted',
		};
	}
}
