import { Field, InputType } from 'type-graphql';

@InputType()
export class OrderItem {
	@Field()
	productName!: string;

	@Field()
	quantity!: number;

	@Field()
	image!: string;

	@Field()
	price!: number;

	@Field()
	product!: string;
}

@InputType()
export class ShippingAddress {
	@Field()
	address!: string;

	@Field()
	city!: string;

	@Field()
	postalCode!: string;

	@Field()
	country!: string;
}

@InputType()
export class AddOrderInput {
	@Field((type) => [OrderItem])
	orderItems: OrderItem[];

	@Field((type) => ShippingAddress)
	shippingAddress: ShippingAddress;

	@Field()
	paymentMethod: string;

	@Field()
	itemsPrice: number;

	@Field()
	taxPrice: number;

	@Field()
	shippingPrice: number;

	@Field()
	totalPrice: number;
}

@InputType()
export class UpdateOrderInput {
	@Field()
	id: string;

	@Field()
	status: string;

	@Field()
	update_time: string;

	@Field()
	email_address: string;
}
