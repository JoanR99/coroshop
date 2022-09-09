import { object, string } from 'zod';

export const addReviewSchema = object({
	comment: string({
		required_error: 'Comment is required',
	}).min(1, 'Comment is required'),
	rating: string({
		required_error: 'Rating is required',
	}).min(1, 'Rating is required'),
});

export const defaultValues = {
	comment: '',
	rating: 1,
};
