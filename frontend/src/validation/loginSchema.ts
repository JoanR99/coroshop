import { object, string, boolean } from 'zod';

export const loginSchema = object({
	email: string({
		required_error: 'Email is required',
	})
		.min(1, 'Email is required')
		.email('Email is invalid'),
	password: string({
		required_error: 'Password is required',
	}).min(1, 'Password is required'),
	persist: boolean(),
});

export const defaultValues = {
	email: '',
	password: '',
	persist: false,
};
