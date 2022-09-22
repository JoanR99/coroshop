import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const clientIdController = async (_req: Request, res: Response) => {
	const clientId = process.env.PAYPAL_CLIENT_ID!;

	res.send(clientId);
};

export default clientIdController;
