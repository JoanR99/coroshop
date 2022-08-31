import { Arg, Field, Mutation, ObjectType, Resolver } from 'type-graphql';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/User';
import dotenv from 'dotenv';
dotenv.config();

@ObjectType()
class LoginResponse {
	@Field()
	accessToken: string;
}

@Resolver()
export class AuthResolver {
	@Mutation(() => LoginResponse)
	async login(
		@Arg('email') email: string,
		@Arg('password') password: string
	): Promise<LoginResponse> {
		const user = await UserModel.findOne({ where: { email } });

		if (!user) {
			throw new Error('User not found');
		}

		const match = await bcrypt.compare(password, user.password);

		if (!match) {
			throw new Error('Forbidden');
		}

		const accessToken = jwt.sign(
			{ userId: user.id },
			process.env.ACCESS_TOKEN_SECRET as string,
			{
				expiresIn: '15m',
			}
		);

		return {
			accessToken,
		};
	}
}
