import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string;

export const hash = (password: string) => bcrypt.hash(password, 10);

export const compare = (password: string, encryptedPassword: string) =>
	bcrypt.compare(password, encryptedPassword);

export const createAccessToken = (body: { userId: string; isAdmin: boolean }) =>
	jwt.sign(body, accessTokenSecret, {
		expiresIn: '15m',
	});

export const createRefreshToken = (body: {
	userId: string;
	tokenVersion: number;
	isAdmin: boolean;
}) =>
	jwt.sign(body, refreshTokenSecret, {
		expiresIn: '7d',
	});

export const validateToken = (token: string, publicKey: string) =>
	jwt.verify(token, publicKey);
