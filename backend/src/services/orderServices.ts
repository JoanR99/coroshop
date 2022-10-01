import OrderModel, { Order } from '../models/Order';
import { AddOrderInput } from '../resolvers/OrderResolvers';

interface CreateOrderBody extends AddOrderInput {
	orderBy: string;
	orderByName: string;
}

export const findAll = () => OrderModel.find();

export const findByUserId = (userId: string) =>
	OrderModel.find({ user: userId });

export const findById = (orderId: string) => OrderModel.findById(orderId);

export const create = (orderBody: CreateOrderBody) =>
	OrderModel.create(orderBody);

export const findByIdAndUpdate = (id: string, orderBody: Partial<Order>) =>
	OrderModel.findByIdAndUpdate(id, { ...orderBody }, { new: true });
