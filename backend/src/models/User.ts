import { getModelForClass, Prop } from '@typegoose/typegoose';
import { Field as GqlField, ObjectType as GqlType } from 'type-graphql';

@GqlType()
export class User {
	@GqlField((_type) => String)
	@Prop({ required: true })
	public name!: string;

	@GqlField((_type) => String)
	@Prop({ required: true, unique: true })
	public email!: string;

	@GqlField((_type) => String)
	@Prop({ required: true })
	public password!: string;

	@GqlField((_type) => String, { nullable: true })
	@Prop()
	public refreshToken?: string;

	@GqlField((_type) => Boolean)
	@Prop({ required: true, default: false })
	public isAdmin!: boolean;
}

const UserModel = getModelForClass(User, {
	schemaOptions: { timestamps: true },
});

export default UserModel;
