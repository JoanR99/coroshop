import { Server } from 'http';
import request from 'supertest-graphql';
import app from '../app';
import server from '../config/apolloServer';
import { Product } from '../models/Product';
import db from './config/database';
import { addProductMutation } from './gql/productMutations';
import { loginMutation } from './gql/authMutations';
import { createUser } from './utils/authUtils';
import {
	ADD_PRODUCT_INPUT,
	UNAUTHORIZED_MESSAGE,
	VALID_CREDENTIALS,
} from './utils/constants';
import { findProduct } from './utils/productUtils';

type AddProductInput = {
	name: string;
	price: number;
	image: string;
	brand: string;
	category: string;
	countInStock: number;
	description: string;
};

type AddProductResponse = {
	addProduct: Product;
};

const addProduct = (
	addProductInput: AddProductInput = ADD_PRODUCT_INPUT,
	options: { accessToken?: string } = {}
) => {
	const agent = request(app)
		.path('/api/graphql')
		.query(addProductMutation)
		.variables({ addProductInput });

	if ('accessToken' in options) {
		agent.set('Authorization', `Bearer ${options.accessToken}`);
	}

	return agent;
};

type LoginInput = {
	email?: string;
	password?: string;
};

type LoginResponse = {
	login: {
		accessToken: string;
	};
};

const login = (loginInput: LoginInput = {}) =>
	request(app)
		.path('/api/graphql')
		.query(loginMutation)
		.variables({ loginInput });

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

describe('Add Product', () => {
	describe('Fail cases', () => {
		it('should return error message on request without user logged', async () => {
			const response = await addProduct();

			expect(
				response.errors
					?.map((error) => error.message)[0]
					.includes(UNAUTHORIZED_MESSAGE)
			).toBeTruthy();
		});

		it('should return error message on request with user not logged as an admin', async () => {
			await createUser();
			const loginResponse = await login(VALID_CREDENTIALS);
			const accessToken = (loginResponse.data as LoginResponse).login
				.accessToken;
			const response = await addProduct(ADD_PRODUCT_INPUT, { accessToken });

			expect(
				response.errors
					?.map((error) => error.message)[0]
					.includes(UNAUTHORIZED_MESSAGE)
			).toBeTruthy();
		});

		it.each`
			field
			${'name'}
			${'price'}
			${'image'}
			${'brand'}
			${'category'}
			${'countInStock'}
			${'description'}
		`(
			'should return error message when there is no $field input field',
			async ({ field }) => {
				await createUser({ ...VALID_CREDENTIALS, name: 'user', isAdmin: true });
				const loginResponse = await login(VALID_CREDENTIALS);
				const accessToken = (loginResponse.data as LoginResponse).login
					.accessToken;
				const productInput = { ...ADD_PRODUCT_INPUT, [field]: undefined };
				const response = await addProduct(productInput, { accessToken });

				expect(
					response.errors
						?.map((error) => error.message)[0]
						.includes(`Field \"${field}\" of required type`)
				).toBeTruthy();
			}
		);
	});

	describe('Success cases', () => {
		it('should return product data on success request', async () => {
			await createUser({ ...VALID_CREDENTIALS, name: 'user', isAdmin: true });
			const loginResponse = await login(VALID_CREDENTIALS);
			const accessToken = (loginResponse.data as LoginResponse).login
				.accessToken;
			const response = await addProduct(ADD_PRODUCT_INPUT, { accessToken });

			expect(
				Object.keys((response.data as AddProductResponse).addProduct)
			).toEqual(['id', 'name', 'image', 'rating', 'price']);
		});

		it('should save product in database on success request', async () => {
			await createUser({ ...VALID_CREDENTIALS, name: 'user', isAdmin: true });
			const loginResponse = await login(VALID_CREDENTIALS);
			const accessToken = (loginResponse.data as LoginResponse).login
				.accessToken;
			const response = await addProduct(ADD_PRODUCT_INPUT, { accessToken });

			const product = await findProduct(
				(response.data as AddProductResponse).addProduct.id
			);

			expect(product).toBeTruthy();

			expect(product?.name).toBe(ADD_PRODUCT_INPUT.name);

			expect(product?.price).toBe(ADD_PRODUCT_INPUT.price);

			expect(product?.image).toBe(ADD_PRODUCT_INPUT.image);
		});
	});
});
