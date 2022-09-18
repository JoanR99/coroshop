import { object, string } from 'zod';

export const paymentMethodSchema = object({
	paymentMethod: string({
		required_error: 'Payment method is required',
	}),
});

export const defaultValues = {
	paymentMethod: 'PayPal',
};
