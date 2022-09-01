import { MiddlewareFn } from 'type-graphql';
import { MyContext } from '../MyContext';
import * as authService from '../services/authService';

export const verifyJwt: MiddlewareFn<MyContext> = ({ context }, next) => {
	try {
		const authHeader =
			context.req.headers.authorization || context.req.headers.Authorization;

		if (typeof authHeader === 'undefined' || Array.isArray(authHeader))
			throw new Error('Unauthorized');

		if (!authHeader?.startsWith('Bearer ')) throw new Error('Unauthorized');

		const token = authHeader.split(' ')[1];

		const publicKey = process.env.ACCESS_TOKEN_SECRET!;

		const tokenPayload = authService.validateToken(token, publicKey);

		context.payload = tokenPayload as any;

		return next();
	} catch (e) {
		throw new Error('Unauthorized');
	}
};
