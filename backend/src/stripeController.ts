import { Request, Response } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: '2022-08-01',
});

const stripeController = async (req: Request, res: Response) => {
	try {
		const { amount } = req.body;

		const paymentIntent = await stripe.paymentIntents.create({
			amount: Math.floor(Number(amount)),
			currency: 'usd',
			payment_method_types: ['card'],
		});

		res.json({ clientSecret: paymentIntent.client_secret });
	} catch (e) {
		console.log(e);
		res.status(400).json(e);
	}
};

export default stripeController;
