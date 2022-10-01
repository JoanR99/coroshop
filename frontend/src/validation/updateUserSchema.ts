import { object, string, boolean } from 'zod';

export const updateUserSchema = object({
	name: string({ required_error: 'Name is required' }).min(
		1,
		'Name is required'
	),
	email: string({
		required_error: 'Email is required',
	})
		.min(1, 'Email is required')
		.email('Email is invalid'),
	isAdmin: boolean(),
});

export const defaultValues = {
	name: '',
	email: '',
	isAdmin: false,
};
