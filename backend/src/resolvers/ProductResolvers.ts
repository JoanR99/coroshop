import {
	Arg,
	Ctx,
	Mutation,
	ObjectType,
	Query,
	Resolver,
	UseMiddleware,
	InputType,
	Field,
} from 'type-graphql';
import { NotFound } from '../errors';
import verifyAdmin from '../middlewares/verifyAdmin';
import verifyJwt from '../middlewares/verifyJwt';
import { Product } from '../models/Product';
import { MyContext } from '../MyContext';

import * as productService from '../services/productServices';
import * as userService from '../services/userService';

@ObjectType()
class GetProductsResponse {
	@Field((type) => [Product])
	products: [Product];

	@Field()
	page: number;

	@Field()
	pages: number;
}

@ObjectType()
class ProductMutationBasicResponse {
	@Field()
	message: string;
}

@InputType()
export class ProductBody {
	@Field()
	name: string;

	@Field()
	price: number;

	@Field()
	image: string;

	@Field()
	brand: string;

	@Field()
	category: string;

	@Field()
	countInStock: number;

	@Field()
	description: string;
}

@Resolver()
export class ProductResolver {
	@Query(() => GetProductsResponse)
	async getProducts(
		@Arg('pageSize') pageSize: number,
		@Arg('keyword') keyword?: string,
		@Arg('pageNumber') pageNumber?: number
	) {
		const page = pageNumber || 1;
		const keywordRegex = keyword
			? {
					name: {
						$regex: keyword,
						$options: 'i',
					},
			  }
			: {};

		const count = await productService.count(keywordRegex);

		const products = await productService
			.findAll(keywordRegex)
			.limit(pageSize)
			.skip(pageSize * (page - 1));

		const pages = Math.ceil(count / pageSize);

		return {
			products,
			page,
			pages,
		};
	}

	@Query(() => Product)
	async getProduct(@Arg('productId') productId: string) {
		const product = await productService.findById(productId);

		if (!product) {
			throw new NotFound('Product not found');
		}

		return product;
	}

	@Query(() => [Product])
	async getTopProducts() {
		const products = await productService
			.findAll({})
			.sort({ rating: -1 })
			.limit(3);

		return products;
	}

	@Mutation(() => Product)
	@UseMiddleware([verifyJwt, verifyAdmin])
	async addProduct(
		@Arg('product', () => ProductBody) product: ProductBody,
		@Ctx() { payload }: MyContext
	) {
		const user = await userService.findById(payload!.userId);

		const createdProduct = await productService.create({
			...product,
			createdBy: user?.id,
		});

		return createdProduct;
	}

	@Mutation(() => ProductMutationBasicResponse)
	@UseMiddleware([verifyJwt, verifyAdmin])
	async deleteProduct(@Arg('productId') productId: string) {
		const product = await productService.findById(productId);

		if (!product) {
			throw new NotFound('Product not found');
		}

		await productService.remove(productId);

		return {
			message: 'Product deleted',
		};
	}

	@Mutation(() => Product)
	@UseMiddleware([verifyJwt, verifyAdmin])
	async updateProduct(
		@Arg('productBody', () => ProductBody) productBody: ProductBody,
		@Arg('productId') productId: string
	) {
		const product = await productService.findByIdAndUpdate(
			productId,
			productBody
		);

		if (!product) {
			throw new NotFound('Product not found');
		}

		return product;
	}
}
