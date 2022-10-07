export const VALID_CREDENTIALS = {
	email: 'user@testing.com',
	password: 'P4ssw0rd',
};

export const BAD_FLOAT_INPUT = 'Float cannot represent non numeric value';
export const BAD_STRING_INPUT = 'String cannot represent a non string value';
export const INVALID_EMAIL =
	'Field "email" of required type "String!" was not provided.';
export const INVALID_PASSWORD =
	'Field "password" of required type "String!" was not provided.';
export const INVALID_NAME =
	'Field "name" of required type "String!" was not provided.';

export const ADD_PRODUCT_INPUT = {
	name: 'product',
	price: 50,
	image: '/image',
	brand: 'brand',
	category: 'category',
	countInStock: 50,
	description: 'desc',
};

export const UNAUTHORIZED_MESSAGE =
	'Access denied! You need to be authorized to perform this action!';

export const BAD_ID = 'Cast to ObjectId failed for value';

export const PRODUCT_NOT_FOUND = 'Product not found';
