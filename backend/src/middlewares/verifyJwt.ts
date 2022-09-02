import { MiddlewareFn, UnauthorizedError } from 'type-graphql';
import { MyContext } from '../MyContext';
import * as authService from '../services/authService';

const verifyJwt: MiddlewareFn<MyContext> = ({ context }, next) => {
	try {
		const authHeader =
			context.req.headers.authorization || context.req.headers.Authorization;

		if (typeof authHeader === 'undefined' || Array.isArray(authHeader))
			throw new UnauthorizedError();

		if (!authHeader?.startsWith('Bearer ')) throw new UnauthorizedError();

		const token = authHeader.split(' ')[1];

		const publicKey = process.env.ACCESS_TOKEN_SECRET!;

		const tokenPayload = authService.validateToken(token, publicKey);

		context.payload = tokenPayload as any;

		return next();
	} catch (e) {
		throw new UnauthorizedError();
	}
};

export default verifyJwt;
