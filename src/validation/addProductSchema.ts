import { object, string } from 'zod';

export const addProductSchema = object({
	name: string({
		required_error: 'Name is required',
	}).min(1, 'Name is required'),
	price: string({
		required_error: 'Price is required',
	}).min(1, 'Price is required'),
	image: string({
		required_error: 'Image is required',
	}).min(1, 'Image is required'),
	brand: string({
		required_error: 'Brand is required',
	}).min(1, 'Brand is required'),
	category: string({
		required_error: 'Category is required',
	}).min(1, 'Category is required'),
	description: string({
		required_error: 'Description is required',
	}).min(1, 'Description is required'),
	countInStock: string({
		required_error: 'Count in stock is required',
	}).min(1, 'Count in stock is required'),
});

export const defaultValues = {
	name: '',
	price: '',
	image: '',
	brand: '',
	category: '',
	description: '',
	countInStock: '',
};
