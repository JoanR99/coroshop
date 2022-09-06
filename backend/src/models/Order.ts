import { getModelForClass, Prop, Ref } from '@typegoose/typegoose';
import { Field as GqlField, ObjectType as GqlType } from 'type-graphql';

import { User } from './User';
import { Product } from './Product';

@GqlType()
export class OrderItem {
	@GqlField((_type) => String)
	@Prop({ required: true })
	public name!: string;

	@GqlField((_type) => Number)
	@Prop({ required: true })
	public quantity!: number;

	@GqlField((_type) => String)
	@Prop({ required: true })
	public image!: string;

	@GqlField((_type) => Number)
	@Prop({ required: true })
	public price!: number;

	@GqlField((_type) => String)
	@Prop({ required: true, ref: () => Product })
	public product!: string;
}

@GqlType()
export class ShippingAddress {
	@GqlField((_type) => String)
	@Prop({ required: true })
	public address!: string;

	@GqlField((_type) => String)
	@Prop({ required: true })
	public city!: string;

	@GqlField((_type) => String)
	@Prop({ required: true })
	public postalCode!: string;

	@GqlField((_type) => String)
	@Prop({ required: true })
	public country!: string;
}

@GqlType()
export class PaymentResult {
	@GqlField((_type) => String)
	@Prop()
	public id: string;

	@GqlField((_type) => String)
	@Prop()
	public status: string;

	@GqlField((_type) => String)
	@Prop()
	public update_time: string;

	@GqlField((_type) => String)
	@Prop()
	public email_address: string;
}

@GqlType()
export class Order {
	@GqlField((_type) => String)
	id: string;

	@GqlField((_type) => String)
	@Prop({ required: true, ref: () => User })
	public user!: Ref<User>;

	@GqlField((_type) => [OrderItem])
	@Prop()
	public orderItems: OrderItem[];

	@GqlField((_type) => ShippingAddress)
	@Prop()
	public shippingAddress!: ShippingAddress;

	@GqlField((_type) => String)
	@Prop({ required: true })
	public paymentMethod!: string;

	@GqlField((_type) => PaymentResult, { nullable: true })
	@Prop()
	public paymentResult?: PaymentResult;

	@GqlField((_type) => Number)
	@Prop({ required: true, default: 0.0 })
	public taxPrice!: number;

	@GqlField((_type) => Number)
	@Prop({ required: true, default: 0.0 })
	public shippingPrice!: number;

	@GqlField((_type) => Number)
	@Prop({ required: true, default: 0.0 })
	public totalPrice!: number;

	@GqlField((_type) => Boolean)
	@Prop({ required: true, default: false })
	public isPaid!: boolean;

	@GqlField((_type) => String)
	@Prop({ required: true })
	public paidAt!: Date;

	@GqlField((_type) => Boolean)
	@Prop({ required: true, default: false })
	public isDelivered!: boolean;

	@GqlField((_type) => String)
	@Prop({ required: true })
	public deliveredAt!: Date;
}

const OrderModel = getModelForClass(Order);

export default OrderModel;
