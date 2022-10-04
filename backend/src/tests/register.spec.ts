import { Server } from 'http';
import request from 'supertest-graphql';
import app from '../app';
import server from '../config/apolloServer';
import UserModel from '../models/User';
import db from './config/database';

import { addUser } from './gql/userMutations';

type AddUserInput = {
	name?: string;
	email?: string;
	password?: string;
};

type RegisterResponse = {
	addUser: {
		id: string;
		name: string;
		email: string;
		isAdmin: boolean;
	};
};

const register = (
	addUserInput: AddUserInput = {
		name: undefined,
		email: undefined,
		password: undefined,
	}
) =>
	request(app).path('/api/graphql').query(addUser).variables({ addUserInput });

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

const VALID_CREDENTIALS = {
	name: 'user',
	email: 'user@example.com',
	password: '#User999',
};

const INVALID_PASSWORD =
	'Field "password" of required type "String!" was not provided.';
const INVALID_EMAIL =
	'Field "email" of required type "String!" was not provided.';
const INVALID_NAME =
	'Field "name" of required type "String!" was not provided.';

describe('Register', () => {
	describe('Failing cases', () => {
		it('should return error messages on register request without credentials', async () => {
			const response = await register();

			const errorMessages = response.errors?.map((error) => error.message);

			expect(errorMessages![0].includes(INVALID_NAME)).toBeTruthy();
			expect(errorMessages![1].includes(INVALID_EMAIL)).toBeTruthy();
			expect(errorMessages![2].includes(INVALID_PASSWORD)).toBeTruthy();
		});

		it.each`
			field         | message               | failCase
			${'password'} | ${[INVALID_PASSWORD]} | ${'without password field'}
			${'email'}    | ${[INVALID_EMAIL]}    | ${'without email field'}
			${'name'}     | ${[INVALID_NAME]}     | ${'without name field'}
		`(
			'should return error message on register request $failCase',
			async ({ field, message }) => {
				const credentials = { ...VALID_CREDENTIALS, [field]: undefined };

				const response = await register(credentials);

				expect(
					response.errors?.map((error) => error.message)[0].includes(message)
				).toBeTruthy();
			}
		);

		it('should return error message on register request with malformed email', async () => {
			const response = await register({
				...VALID_CREDENTIALS,
				email: 'user@',
			});

			expect(
				response.errors
					?.map((error) => error.message)[0]
					.includes('Argument Validation Error')
			).toBeTruthy();
		});

		it.each`
			password                       | failCase
			${'P@ssw0r'}                   | ${'shorter than 8 characters'}
			${'P@ssw0rdxxxxxxxxxxxxxxxxx'} | ${'with 20 characters or more'}
			${'Passw0rd'}                  | ${'without special character'}
			${'P@SSW0RD'}                  | ${'without lowercase letter'}
			${'p@ssw0rd'}                  | ${'without uppercase letter'}
			${'p@ssword'}                  | ${'without number'}
		`(
			'should return error message on register request with password $failCase',
			async ({ password }) => {
				const response = await register({
					...VALID_CREDENTIALS,
					password,
				});

				expect(
					response.errors
						?.map((error) => error.message)[0]
						.includes('Argument Validation Error')
				).toBeTruthy();
			}
		);

		it.each`
			name                       | failCase
			${'u'}                     | ${'shorter than 3 characters'}
			${'useruseruseruseruseru'} | ${'with 20 characters or more'}
		`(
			'should return error message when username $failCase',
			async ({ name, message }) => {
				const response = await register({
					...VALID_CREDENTIALS,
					name,
				});

				expect(
					response.errors
						?.map((error) => error.message)[0]
						.includes('Argument Validation Error')
				).toBeTruthy();
			}
		);
	});

	describe('Success cases', () => {
		it('should return user created on valid register request', async () => {
			const response = await register(VALID_CREDENTIALS);

			expect((response.data as RegisterResponse).addUser.name).toBe(
				VALID_CREDENTIALS.name
			);
			expect((response.data as RegisterResponse).addUser.email).toBe(
				VALID_CREDENTIALS.email
			);
		});

		it('should save user in database on valid register request', async () => {
			await register(VALID_CREDENTIALS);

			const userList = await UserModel.find({});

			expect(userList.length).toBe(1);
		});

		it('should hash the password in the database', async () => {
			await register(VALID_CREDENTIALS);

			const userList = await UserModel.find({});

			expect(userList[0].password).not.toBe(VALID_CREDENTIALS.password);
		});
	});
});
