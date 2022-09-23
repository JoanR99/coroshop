import { CartItem, ShippingAddress } from '../cart/cartTypes';

export interface Order {
	id: string;
	orderBy: string;
	orderItems: OrderItem[];
	shippingAddress: ShippingAddress;
	paymentMethod: string;
	paymentResult: PaymentResult;
	itemsPrice: number;
	taxPrice: number;
	shippingPrice: number;
	totalPrice: number;
	isPaid: boolean;
	paidAt: string;
	isDelivered: boolean;
	deliveredAt: string;
	createdAt: string;
}

export type OrderItem = Pick<CartItem, 'quantity' | 'image' | 'price'> & {
	productName: string;
	product: string;
};

export type PaymentResult = {
	id: string;
	status: string;
	update_time: string;
	email_address: string;
};

export type GetOrdersResponse = {
	getOrders: Order[];
};

export type GetOrderResponse = {
	getOrderById: Order;
};

export type AddOrderInput = Pick<
	Order,
	| 'orderItems'
	| 'shippingAddress'
	| 'paymentMethod'
	| 'taxPrice'
	| 'shippingPrice'
	| 'totalPrice'
	| 'itemsPrice'
>;

export type AddOrderResponse = {
	addOrder: Order;
};

export type UpdateOrderToPaidResponse = {
	updateOrderToPaid: Order;
};

export type UpdateOrderToPaidInput = {
	orderId: string;
	paymentResultBody: PaymentResult;
};

export type UpdateOrderToDeliveredResponse = {
	updateOrderToDelivered: Order;
};
