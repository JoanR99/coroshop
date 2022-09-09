import { object, string } from 'zod';

export const registerSchema = object({
	name: string({
		required_error: 'Name is required',
	}).min(1, 'Name is required'),
	email: string({
		required_error: 'Email is required',
	})
		.min(1, 'Email is required')
		.email('Email is invalid'),
	password: string({
		required_error: 'Password is required',
	}).min(1, 'Password is required'),
	passwordConfirm: string({
		required_error: 'Password confirm is required',
	}).min(1, 'Password confirm is required'),
}).refine((data) => data.password === data.passwordConfirm, {
	path: ['passwordConfirm'],
	message: 'Passwords must match',
});

export const defaultValues = {
	name: '',
	email: '',
	password: '',
	passwordConfirm: '',
};
