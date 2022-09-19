import { getModelForClass, Prop, ModelOptions } from '@typegoose/typegoose';
import { Field as GqlField, ObjectType as GqlType } from 'type-graphql';

@GqlType()
@ModelOptions({
	schemaOptions: { timestamps: true },
})
export class User {
	@GqlField((_type) => String)
	id: string;

	@GqlField((_type) => String)
	@Prop({ required: true })
	public name!: string;

	@GqlField((_type) => String)
	@Prop({ required: true, unique: true })
	public email!: string;

	@Prop({ required: true })
	public password!: string;

	@Prop({ default: 0 })
	public refreshTokenVersion: number;

	@GqlField((_type) => Boolean)
	@Prop({ required: true, default: false })
	public isAdmin!: boolean;
}

const UserModel = getModelForClass(User);

export default UserModel;
