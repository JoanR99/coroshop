import { ApolloError } from 'apollo-server-express';
import {
	Arg,
	Ctx,
	InputType,
	Mutation,
	Query,
	Resolver,
	UseMiddleware,
	Field,
} from 'type-graphql';
import { NotFound } from '../errors';
import verifyAdmin from '../middlewares/verifyAdmin';
import verifyJwt from '../middlewares/verifyJwt';
import { Order } from '../models/Order';
import { MyContext } from '../MyContext';
import * as orderService from '../services/orderServices';

@InputType()
class OrderItem {
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
class ShippingAddress {
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
class UpdateOrderInput {
	@Field()
	id: string;

	@Field()
	status: string;

	@Field()
	update_time: string;

	@Field()
	email_address: string;
}

@Resolver()
export class OrderResolver {
	@Query(() => [Order])
	@UseMiddleware([verifyJwt, verifyAdmin])
	async getOrders() {
		const orders = await orderService.findAll();

		return orders;
	}

	@Query(() => [Order])
	@UseMiddleware(verifyJwt)
	async getUserOrders(@Ctx() { payload }: MyContext) {
		const orders = await orderService.findByUserId(payload!.userId);

		return orders;
	}

	@Query(() => Order)
	@UseMiddleware(verifyJwt)
	async getOrderById(@Arg('orderId') orderId: string) {
		const order = await orderService.findById(orderId);

		if (!order) {
			throw new NotFound('Order not found');
		}

		return order;
	}

	@Mutation(() => Order)
	@UseMiddleware(verifyJwt)
	async addOrder(
		@Arg('orderBody') orderBody: AddOrderInput,
		@Ctx() { payload }: MyContext
	) {
		if (orderBody.orderItems && orderBody.orderItems.length === 0) {
			throw new ApolloError('No order items');
		} else {
			const order = await orderService.create({
				...orderBody,
				orderBy: payload!.userId,
			});

			return order;
		}
	}

	@Mutation(() => Order)
	@UseMiddleware(verifyJwt)
	async updateOrderToPaid(
		@Arg('orderId') orderId: string,
		@Arg('paymentResultBody') paymentResultBody: UpdateOrderInput
	) {
		const updatedOrder = await orderService.findByIdAndUpdate(orderId, {
			paymentResult: paymentResultBody,
			isPaid: true,
			paidAt: new Date(Date.now()),
		});

		if (!updatedOrder) {
			throw new NotFound('Order not found');
		}

		return updatedOrder;
	}

	@Mutation(() => Order)
	@UseMiddleware(verifyJwt)
	async updateOrderToDelivered(@Arg('orderId') orderId: string) {
		const updatedOrder = await orderService.findByIdAndUpdate(orderId, {
			isDelivered: true,
			deliveredAt: new Date(Date.now()),
		});

		if (!updatedOrder) {
			throw new NotFound('Order not found');
		}

		return updatedOrder;
	}
}
