import { IsEmail, Length } from 'class-validator';
import { Field, InputType, ObjectType } from 'type-graphql';

import { User } from '../models/User';
import { isValidPassword } from './isValidPassword';

@InputType()
export class AddUserInput implements Partial<User> {
	@Field()
	@Length(3, 20, { message: 'Name must be between 3 and 20 characters long' })
	name!: string;

	@Field()
	@IsEmail({ message: 'Invalid Email' })
	email!: string;

	@Field()
	@Length(8, 20, {
		message: 'Password must be between 8 and 20 characters long',
	})
	@isValidPassword({
		message:
			'Password must contain at least a lowercase letter, a uppercase letter, a number and a special character ( ! @ # $ % )',
	})
	password!: string;
}

@ObjectType()
export class GetUsersResponse {
	@Field((type) => [User])
	users: [User];

	@Field()
	page: number;

	@Field()
	pages: number;
}

@ObjectType()
export class BasicMutationResponse {
	@Field()
	message: string;
}

@InputType()
export class UpdateUserProfileInput {
	@Field({ nullable: true })
	name?: string;

	@Field({ nullable: true })
	email?: string;

	@Field({ nullable: true })
	password?: string;
}

@InputType()
export class UpdateUser {
	@Field({ nullable: true })
	name?: string;

	@Field({ nullable: true })
	email?: string;

	@Field({ nullable: true })
	isAdmin?: boolean;
}
