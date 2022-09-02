import { Arg, Ctx, Field, Mutation, ObjectType, Resolver } from 'type-graphql';

import * as userService from '../services/userService';
import * as authService from '../services/authService';
import { MyContext } from '../MyContext';
import { NotFound } from '../errors';
import { ForbiddenError } from 'apollo-server-express';

@ObjectType()
class LoginResponse {
	@Field()
	accessToken: string;
}

@ObjectType()
class LogoutResponse {
	@Field()
	message: string;
}

@ObjectType()
class RevokeResponse {
	@Field()
	message: string;
}

@Resolver()
export class AuthResolver {
	@Mutation(() => LoginResponse)
	async login(
		@Arg('email') email: string,
		@Arg('password') password: string,
		@Ctx() { res }: MyContext
	): Promise<LoginResponse> {
		const user = await userService.findByEmail(email);

		if (!user) {
			throw new NotFound('User not found');
		}

		const match = await authService.compare(password, user.password);

		if (!match) {
			throw new ForbiddenError('Forbidden');
		}

		user.refreshTokenVersion = user.refreshTokenVersion + 1;
		await user.save();

		const accessToken = authService.createAccessToken({ userId: user.id });
		const refreshToken = authService.createRefreshToken({
			userId: user.id,
			tokenVersion: user.refreshTokenVersion,
		});

		res.cookie('jwt', refreshToken, {
			httpOnly: true,
			sameSite: 'none',
			secure: true,
			maxAge: 24 * 60 * 60 * 1000,
		});

		return {
			accessToken,
		};
	}

	@Mutation(() => LogoutResponse)
	logout(@Ctx() { res }: MyContext) {
		res.clearCookie('jwt', {
			httpOnly: true,
			sameSite: 'none',
			secure: true,
			maxAge: 24 * 60 * 60 * 1000,
		});

		return { message: 'Logout success' };
	}

	@Mutation(() => RevokeResponse)
	async revokeRefreshToken(@Arg('userId') userId: string) {
		const user = await userService.findById(userId);

		if (!user) throw new NotFound('User not found');

		user.refreshTokenVersion = user.refreshTokenVersion + 1;
		await user.save();

		return { message: 'Token revoked' };
	}
}
