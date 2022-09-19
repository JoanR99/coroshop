import { gql } from 'graphql-request';

export const addOrder = gql`
	mutation AddOrder($orderBody: AddOrderInput!) {
		addOrder(orderBody: $orderBody) {
			id
			orderBy
			createdAt
			totalPrice
			isPaid
			paidAt
			isDelivered
			deliveredAt
		}
	}
`;

export const updateOrderToPaid = gql`
	mutation UpdateOrderToPaid(
		$orderId: String!
		$paymentResult: PaymentResult!
	) {
		updateOrderToPaid(orderId: $orderId, paymentResult: $paymentResult) {
			id
			orderBy
			createdAt
			totalPrice
			isPaid
			paidAt
			isDelivered
			deliveredAt
		}
	}
`;

export const updateOrderToDelivered = gql`
	mutation UpdateOrderToDelivered($orderId: String!) {
		updateOrderToDelivered(orderId: $orderId) {
			id
			orderBy
			createdAt
			totalPrice
			isPaid
			paidAt
			isDelivered
			deliveredAt
		}
	}
`;
