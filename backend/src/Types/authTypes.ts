import { Field, ObjectType } from 'type-graphql';

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
