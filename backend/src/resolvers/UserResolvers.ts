import {
	Arg,
	Ctx,
	Mutation,
	Query,
	Resolver,
	UseMiddleware,
	ObjectType,
	Field,
} from 'type-graphql';
import { User } from '../models/User';

import * as userService from '../services/userService';
import * as authService from '../services/authService';
import verifyJwt from '../middlewares/verifyJwt';
import verifyAdmin from '../middlewares/verifyAdmin';
import { NotFound } from '../errors';
import { MyContext } from '../MyContext';

@ObjectType()
class DeleteUserResponse {
	@Field()
	message: string;
}

@Resolver()
export class UserResolver {
	@Query(() => [User])
	@UseMiddleware([verifyJwt, verifyAdmin])
	async getUsers() {
		return await userService.findAll();
	}

	@Query(() => User)
	@UseMiddleware(verifyJwt)
	async getUserProfile(@Ctx() { payload }: MyContext) {
		const user = userService.findById(payload!.userId).select('-password');

		if (!user) throw new NotFound('User not found');

		return {
			id: user.id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		};
	}

	@Query(() => User)
	@UseMiddleware([verifyJwt, verifyAdmin])
	async getUser(@Arg('userId') userId: string) {
		const user = userService.findById(userId).select('-password');

		if (!user) throw new NotFound('User not found');

		return user;
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

	@Mutation(() => User)
	@UseMiddleware(verifyJwt)
	async updateUserProfile(
		@Arg('name') name: string,
		@Arg('email') email: string,
		@Arg('password') password: string,
		@Ctx() { payload }: MyContext
	) {
		const user = await userService.findById(payload!.userId);

		if (user) {
			user.name = name || user.name;
			user.email = email || user.email;
			if (password) {
				const hash = await authService.hash(password);
				user.password = hash;
			}

			const updatedUser = await user.save();

			return {
				id: updatedUser.id,
				name: updatedUser.name,
				email: updatedUser.email,
				isAdmin: updatedUser.isAdmin,
			};
		} else {
			throw new NotFound('User not found');
		}
	}

	@Mutation(() => User)
	@UseMiddleware([verifyJwt, verifyAdmin])
	async updateUser(
		@Arg('name') name: string,
		@Arg('email') email: string,
		@Arg('isAdmin') isAdmin: boolean,
		@Arg('userId') userId: string
	) {
		const user = await userService.findById(userId);

		if (user) {
			user.name = name || user.name;
			user.email = email || user.email;
			user.isAdmin = isAdmin;

			const updatedUser = await user.save();

			return {
				id: updatedUser.id,
				name: updatedUser.name,
				email: updatedUser.email,
				isAdmin: updatedUser.isAdmin,
			};
		} else {
			throw new NotFound('User not found');
		}
	}

	@Mutation(() => DeleteUserResponse)
	@UseMiddleware([verifyJwt, verifyAdmin])
	async deleteUser(@Arg('userId') userId: string) {
		const user = await userService.findById(userId);

		if (user) {
			await user.remove();

			return {
				message: 'User deleted',
			};
		} else {
			throw new NotFound('User not found');
		}
	}
}
