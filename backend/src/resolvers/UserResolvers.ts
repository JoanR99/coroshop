import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import bcrypt from 'bcrypt';
import UserModel, { User } from '../models/User';

@Resolver()
export class UserResolver {
	@Query(() => [User])
	async getUsers() {
		return await UserModel.find();
	}

	@Mutation(() => Boolean)
	async addUser(
		@Arg('name') name: string,
		@Arg('email') email: string,
		@Arg('password') password: string
	) {
		try {
			const hash = await bcrypt.hash(password, 10);

			await UserModel.create({ name, email, password: hash });
		} catch (e) {
			return false;
		}

		return true;
	}
}
