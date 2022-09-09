import { Request, Response } from 'express';
import * as authService from './services/authService';
import * as userService from './services/userService';

const refreshTokenController = async (req: Request, res: Response) => {
	let tokenPayload: any = null;
	try {
		const cookies = req.cookies;

		if (!cookies?.jwt) return res.sendStatus(401);

		const refreshToken = cookies.jwt;

		const secretToken = process.env.REFRESH_TOKEN_SECRET!;

		tokenPayload = authService.validateToken(refreshToken, secretToken);

		const user = await userService.findById(tokenPayload.userId);

		if (!user || user.refreshTokenVersion !== tokenPayload.tokenVersion)
			return res.sendStatus(403);

		const accessToken = authService.createAccessToken({
			userId: tokenPayload.userId,
			isAdmin: tokenPayload.isAdmin,
		});

		return res.json({ accessToken });
	} catch (e) {
		return res.sendStatus(403);
	}
};

export default refreshTokenController;
