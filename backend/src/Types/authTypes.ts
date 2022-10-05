import { Field, ObjectType, InputType } from 'type-graphql';
import { IsEmail } from 'class-validator';
import { User } from '../models/User';

@InputType()
export class LoginInput implements Partial<User> {
	@Field()
	@IsEmail({ message: 'Invalid Email' })
	email!: string;

	@Field()
	password!: string;
}

@ObjectType()
export class LoginResponse {
	@Field()
	accessToken: string;
}

@ObjectType()
export class LogoutResponse {
	@Field()
	message: string;
}

@ObjectType()
export class RevokeResponse {
	@Field()
	message: string;
}
