import {
	Arg,
	Ctx,
	Mutation,
	Query,
	Resolver,
	UseMiddleware,
} from 'type-graphql';

import { User } from '../models/User';
import * as userService from '../services/userService';
import * as authService from '../services/authService';
import verifyJwt from '../middlewares/verifyJwt';
import verifyAdmin from '../middlewares/verifyAdmin';
import { NotFound } from '../errors';
import { MyContext } from '../MyContext';
import {
	GetUsersResponse,
	BasicMutationResponse,
	UpdateUser,
	UpdateUserProfileInput,
} from '../Types/userTypes';

@Resolver()
export class UserResolver {
	@Query(() => GetUsersResponse)
	@UseMiddleware([verifyJwt, verifyAdmin])
	async getUsers(
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

		const count = await userService.count(keywordRegex);

		const users = await userService
			.findAll(keywordRegex)
			.limit(pageSize)
			.skip(pageSize * (page - 1));

		const pages = Math.ceil(count / pageSize);

		return {
			users,
			page,
			pages,
		};
	}

	@Query(() => User)
	@UseMiddleware(verifyJwt)
	async getUserProfile(@Ctx() { payload }: MyContext) {
		const user = await userService
			.findById(payload!.userId)
			.select('-password');

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
		const user = await userService.findById(userId).select('-password');

		if (!user) throw new NotFound('User not found');

		return user;
	}

	@Mutation(() => BasicMutationResponse)
	async addUser(
		@Arg('name') name: string,
		@Arg('email') email: string,
		@Arg('password') password: string
	) {
		const hash = await authService.hash(password);

		await userService.create(name, email, hash);

		return {
			message: 'User created',
		};
	}

	@Mutation(() => User)
	@UseMiddleware(verifyJwt)
	async updateUserProfile(
		@Ctx() { payload }: MyContext,
		@Arg('updateBody') updateBody: UpdateUserProfileInput
	) {
		const updatedUser = await userService.findByIdAndUpdate(
			payload!.userId,
			updateBody
		);

		if (!updatedUser) {
			throw new NotFound('User not found');
		}

		return {
			id: updatedUser.id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
		};
	}

	@Mutation(() => User)
	@UseMiddleware([verifyJwt, verifyAdmin])
	async updateUser(
		@Arg('updateBody') updateBody: UpdateUser,
		@Arg('userId') userId: string
	) {
		const updatedUser = await userService.findByIdAndUpdate(userId, updateBody);

		if (!updatedUser) {
			throw new NotFound('User not found');
		}

		return {
			id: updatedUser.id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
		};
	}

	@Mutation(() => BasicMutationResponse)
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
