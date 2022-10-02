import { Field, InputType, ObjectType } from 'type-graphql';

@InputType()
export class ProductReview {
	@Field()
	rating: number;

	@Field()
	comment: string;
}

@ObjectType()
export class MutationBasicResponse {
	@Field()
	message: string;
}
