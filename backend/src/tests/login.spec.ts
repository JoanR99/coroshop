import { Server } from 'http';
import request from 'supertest-graphql';
import app from '../app';
import server from '../config/apolloServer';
import UserModel from '../models/User';
import db from './config/database';
import { loginMutation } from './gql/authMutations';
import { createUser } from './utils/authUtils';
import {
	VALID_CREDENTIALS,
	INVALID_EMAIL,
	INVALID_PASSWORD,
} from './utils/constants';

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

describe('Login', () => {
	describe('Failing cases', () => {
		it('should return error messages on login request without credentials', async () => {
			const response = await login();

			const errorMessages = response.errors?.map((error) => error.message);

			expect(errorMessages![0].includes(INVALID_EMAIL)).toBeTruthy();
			expect(errorMessages![1].includes(INVALID_PASSWORD)).toBeTruthy();
		});

		it.each`
			field         | message               | failCase
			${'password'} | ${[INVALID_PASSWORD]} | ${'without password field'}
			${'email'}    | ${[INVALID_EMAIL]}    | ${'without email field'}
		`(
			'should return error message on login request $failCase',
			async ({ field, message }) => {
				const credentials = { ...VALID_CREDENTIALS, [field]: undefined };

				const response = await login(credentials);

				expect(
					response.errors?.map((error) => error.message)[0].includes(message)
				).toBeTruthy();
			}
		);

		it('should return error message on login request with malformed email', async () => {
			const response = await login({ ...VALID_CREDENTIALS, email: 'user@' });

			expect(
				response.errors
					?.map((error) => error.message)[0]
					.includes('Argument Validation Error')
			).toBeTruthy();
		});

		it('should return error message on login request with unregistered email', async () => {
			const response = await login({
				email: 'user@testing.com',
				password: 'P4ssw0rd',
			});

			expect(response.errors?.map((error) => error.message)[0]).toBe(
				'User not found'
			);
		});

		it('should return error message on login request with wrong password', async () => {
			await createUser();

			const response = await login({
				email: 'user@testing.com',
				password: 'password',
			});

			expect(response.errors?.map((error) => error.message)[0]).toBe(
				'Wrong credentials'
			);
		});
	});

	describe('Success cases', () => {
		it('should return accessToken when login success', async () => {
			await createUser();

			const response = await login(VALID_CREDENTIALS);

			expect(
				(response.data as LoginResponse).login.accessToken
			).not.toBeUndefined();
		});

		it('should create refreshToken and save refreshTokenVersion in database', async () => {
			await createUser();

			await login(VALID_CREDENTIALS);

			const user = await UserModel.findOne({
				where: { email: VALID_CREDENTIALS.email },
			});

			expect(user?.refreshTokenVersion).toBe(1);
		});

		it('should return refreshToken cookie when login success', async () => {
			await createUser();

			const response = await login(VALID_CREDENTIALS);

			expect(response.response.header['set-cookie']).not.toBeUndefined();
		});
	});
});
