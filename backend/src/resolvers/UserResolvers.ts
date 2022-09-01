import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { User } from '../models/User';

import * as userService from '../services/userService';
import * as authService from '../services/authService';
import { verifyJwt } from '../middlewares/verifyJwt';

@Resolver()
export class UserResolver {
	@Query(() => [User])
	@UseMiddleware(verifyJwt)
	async getUsers() {
		return await userService.findAll();
	}

	@Mutation(() => Boolean)
	async addUser(
		@Arg('name') name: string,
		@Arg('email') email: string,
		@Arg('password') password: string
	) {
		try {
			const hash = await authService.hash(password);

			await userService.create(name, email, hash);
		} catch (e) {
			return false;
		}

		return true;
	}
}
