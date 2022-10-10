import { object, string } from 'zod';

export const shippingAddressSchema = object({
	address: string({
		required_error: 'Address is required',
	}).min(1, 'Address is required'),
	city: string({
		required_error: 'City is required',
	}).min(1, 'City is required'),
	postalCode: string({
		required_error: 'Postal code is required',
	}).min(1, 'Postal code is required'),
	country: string({
		required_error: 'Country is required',
	}).min(1, 'Country is required'),
});
