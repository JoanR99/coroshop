import OrderModel, { Order } from '../models/Order';
import { AddOrderInput } from '../resolvers/OrderResolvers';

export const findAll = () => OrderModel.find().populate('user', 'id name');

export const findByUserId = (userId: string) =>
	OrderModel.find({ user: userId });

export const findById = (orderId: string) => OrderModel.findById(orderId);

export const create = (orderBody: AddOrderInput) =>
	OrderModel.create(orderBody);

export const findByIdAndUpdate = (id: string, orderBody: Partial<Order>) =>
	OrderModel.findByIdAndUpdate(id, { ...orderBody });
