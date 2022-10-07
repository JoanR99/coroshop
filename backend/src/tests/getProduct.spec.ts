import { Server } from 'http';
import request from 'supertest-graphql';
import app from '../app';
import server from '../config/apolloServer';
import db from './config/database';
import { getProductQuery } from './gql/productQueries';
import { createUser } from './utils/authUtils';
import { Product } from '../models/Product';
import { BAD_ID, PRODUCT_NOT_FOUND } from './utils/constants';
import {
	createProducts,
	deleteProduct,
	findAllProducts,
} from './utils/productUtils';

type GetProductResponse = {
	getProduct: Product;
};

const getProduct = (productId: string) =>
	request(app)
		.path('/api/graphql')
		.query(getProductQuery)
		.variables({ productId });

let expressServer: Server;

beforeAll(async () => {
	await db.connect();
	const apolloServer = await server();

	await apolloServer.start();

	apolloServer.applyMiddleware({ app, path: '/api/graphql', cors: false });

	expressServer = app.listen(8080, () =>
		console.log('Server started at port 8080')
	);
});

afterEach(async () => await db.clear());
afterAll(async () => {
	await db.close();
	expressServer.close();
});

describe('Get Product', () => {
	describe('Fail cases', () => {
		it('should  return error message when productId argument is not a valid id', async () => {
			const response = await getProduct('ididididididididididid');

			expect(
				response.errors?.map((error) => error.message)[0].includes(BAD_ID)
			).toBeTruthy();
		});

		it('should  return error message when product not found', async () => {
			const user = await createUser();
			await createProducts(2, user.id, user.name);

			const products = await findAllProducts();

			const deletedProduct = await deleteProduct(products[0].id);

			const response = await getProduct(deletedProduct!.id);

			expect(
				response.errors
					?.map((error) => error.message)[0]
					.includes(PRODUCT_NOT_FOUND)
			).toBeTruthy();
		});
	});

	describe('Success cases', () => {
		it('should return product data on response body', async () => {
			const user = await createUser();
			await createProducts(1, user.id, user.name);
			const products = await findAllProducts();

			const response = await getProduct(products[0].id);

			expect(
				Object.keys((response.data as GetProductResponse).getProduct)
			).toEqual([
				'id',
				'name',
				'image',
				'brand',
				'category',
				'description',
				'rating',
				'numReviews',
				'price',
				'countInStock',
			]);
		});

		it('should return correct product data', async () => {
			const user = await createUser();
			await createProducts(1, user.id, user.name);
			const products = await findAllProducts();

			const response = await getProduct(products[0].id);

			expect((response.data as GetProductResponse).getProduct.id).toBe(
				products[0].id
			);
		});
	});
});
