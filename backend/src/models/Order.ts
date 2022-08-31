import { getModelForClass, Prop, Ref } from '@typegoose/typegoose';

import { User } from './User';
import { Product } from './Product';
import { Date } from 'mongoose';

class OrderItem {
	@Prop({ required: true })
	public name!: string;

	@Prop({ required: true })
	public quantity!: number;

	@Prop({ required: true })
	public image!: string;

	@Prop({ required: true })
	public price!: number;

	@Prop({ required: true, ref: () => Product })
	public product!: string;
}

class ShippingAddress {
	@Prop({ required: true })
	public address!: string;

	@Prop({ required: true })
	public city!: string;

	@Prop({ required: true })
	public postalCode!: string;

	@Prop({ required: true })
	public country!: string;
}

class PaymentResult {
	@Prop()
	public id: string;

	@Prop()
	public status: string;

	@Prop()
	public update_time: string;

	@Prop()
	public email_address: string;
}

class Order {
	@Prop({ required: true, ref: () => User })
	public user!: Ref<User>;

	@Prop()
	public orderItems: OrderItem[];

	@Prop()
	public shippingAddress!: ShippingAddress;

	@Prop({ required: true })
	public paymentMethod!: string;

	@Prop()
	public paymentResult: PaymentResult;

	@Prop({ required: true, default: 0.0 })
	public taxPrice!: number;

	@Prop({ required: true, default: 0.0 })
	public shippingPrice!: number;

	@Prop({ required: true, default: 0.0 })
	public totalPrice!: number;

	@Prop({ required: true, default: false })
	public isPaid!: boolean;

	@Prop({ required: true })
	public paidAt!: Date;

	@Prop({ required: true, default: false })
	public isDelivered!: boolean;

	@Prop({ required: true })
	public deliveredAt!: Date;
}

const OrderModel = getModelForClass(Order);

export default OrderModel;
