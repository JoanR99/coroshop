import {
	Arg,
	Ctx,
	Mutation,
	Query,
	Resolver,
	UseMiddleware,
	ObjectType,
	Field,
	InputType,
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

@InputType()
export class UpdateUserProfileInput {
	@Field({ nullable: true })
	name?: string;

	@Field({ nullable: true })
	email?: string;

	@Field({ nullable: true })
	password?: string;
}

@InputType()
export class UpdateUserProfile extends UpdateUserProfileInput {
	@Field({ nullable: true })
	isAdmin?: boolean;
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
			console.log(e);
			return false;
		}

		return true;
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
		@Arg('updateBody') updateBody: UpdateUserProfile,
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
