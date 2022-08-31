import { getModelForClass, Prop, Ref } from '@typegoose/typegoose';

import { User } from './User';

export class Review {
	@Prop({ required: true })
	public rating!: number;

	@Prop({ required: true })
	public comment!: string;

	@Prop({ required: true, ref: () => User })
	public user!: Ref<User>;
}

const ReviewModel = getModelForClass(Review, {
	schemaOptions: { timestamps: true },
});

export default ReviewModel;
