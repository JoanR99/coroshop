import z, { object } from 'zod';

const methods = ['PayPal', 'Stripe'] as const;

export type Method = typeof methods[number];

z.enum(methods);

export const paymentMethodSchema = object({
	paymentMethod: z.enum(methods),
});

export const defaultValues = {
	paymentMethod: 'PayPal',
};
