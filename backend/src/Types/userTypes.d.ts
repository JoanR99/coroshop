import { Field, InputType, ObjectType } from 'type-graphql';

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
