import { ModelOptions, Prop, Ref } from '@typegoose/typegoose';
import { Field as GqlField, ObjectType as GqlType } from 'type-graphql';
import { Product } from './Product';
import { User } from './User';

@GqlType()
@ModelOptions({
	schemaOptions: { timestamps: true },
})
export class Review {
	@GqlField((_type) => Number)
	@Prop({ required: true })
	public rating!: number;

	@GqlField((_type) => String)
	@Prop({ required: true })
	public comment!: string;

	@GqlField((_type) => User)
	@Prop({ required: true, ref: () => User })
	public user!: Ref<User>;

	@GqlField((_type) => Product)
	@Prop({ required: true, ref: () => Product })
	public product!: Ref<Product>;
}
