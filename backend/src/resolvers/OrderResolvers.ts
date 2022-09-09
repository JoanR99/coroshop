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
import {
	Order,
	OrderItem,
	PaymentResult,
	ShippingAddress,
} from '../models/Order';
import { MyContext } from '../MyContext';
import * as orderService from '../services/orderServices';

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
	async getUerOrders(@Ctx() { payload }: MyContext) {
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
		@Arg('paymentResultBody') paymentResultBody: PaymentResult
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
