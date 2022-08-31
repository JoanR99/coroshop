import { getModelForClass, Prop, Ref } from '@typegoose/typegoose';

import { User } from './User';
import { Review } from './Review';

export class Product {
	@Prop({ required: true, ref: () => User })
	public user!: Ref<User>;

	@Prop({ required: true })
	public name!: string;

	@Prop({ required: true })
	public image!: string;

	@Prop({ required: true })
	public brand!: string;

	@Prop({ required: true })
	public category!: string;

	@Prop({ required: true })
	public description!: string;

	@Prop()
	public reviews: Review[];

	@Prop({ required: true, default: 0 })
	public rating!: number;

	@Prop({ required: true, default: 0 })
	public numReviews!: number;

	@Prop({ required: true, default: 0 })
	public price!: number;

	@Prop({ required: true, default: 0 })
	public countInStock!: number;
}

const ProductModel = getModelForClass(Product);

export default ProductModel;
