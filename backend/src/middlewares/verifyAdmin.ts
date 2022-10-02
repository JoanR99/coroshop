import { MiddlewareFn, UnauthorizedError } from 'type-graphql';

import { MyContext } from '../MyContext';
import * as userService from '../services/userService';

const verifyAdmin: MiddlewareFn<MyContext> = async ({ context }, next) => {
	const user = await userService.findById(context.payload!.userId);

	if (user && user.isAdmin && context.payload?.isAdmin) {
		return next();
	}

	throw new UnauthorizedError();
};

export default verifyAdmin;
