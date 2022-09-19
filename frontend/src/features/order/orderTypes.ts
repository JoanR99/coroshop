import { ShippingAddress } from '../cart/cartTypes';

export interface OrderItem {
	productName: string;
	quantity: number;
	image: string;
	price: number;
	product: string;
}

export interface PaymentResult {
	id: string;
	status: string;
	update_time: string;
	email_address: string;
}

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
	paidAt: Date;
	isDelivered: boolean;
	deliveredAt: Date;
	createdAt: Date;
}

export interface GetOrdersResponse {
	getOrders: Order[];
}

export interface GetOrderResponse {
	getOrderById: Order;
}

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

export interface AddOrderResponse {
	addOrder: Order;
}

export interface UpdateOrderToPaid {
	updateOrderToPaid: Order;
}

export type UpdateOrderToPaidInput = {
	orderId: string;
	paymentResult: PaymentResult;
};

export interface UpdateOrderToDelivered {
	updateOrderToDelivered: Order;
}
