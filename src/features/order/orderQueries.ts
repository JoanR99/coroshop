import { gql } from 'graphql-request';

export const getOrders = gql`
	query GetOrders {
		getOrders {
			id
			orderBy
			orderByName
			createdAt
			totalPrice
			isPaid
			paidAt
			isDelivered
			deliveredAt
			createdAt
		}
	}
`;

export const getOrder = gql`
	query GetOrder($orderId: String!) {
		getOrderById(orderId: $orderId) {
			id
			orderBy
			orderByName
			createdAt
			totalPrice
			isPaid
			paidAt
			isDelivered
			deliveredAt
			shippingPrice
			taxPrice
			totalPrice
			paymentMethod
			shippingAddress {
				address
				city
				postalCode
				country
			}
			orderItems {
				image
				quantity
				price
				product
				productName
			}
		}
	}
`;

export const getUserOrders = gql`
	query GetUserOrders {
		getUserOrders {
			id
			orderBy
			orderByName
			createdAt
			totalPrice
			isPaid
			paidAt
			isDelivered
			deliveredAt
			createdAt
		}
	}
`;

export const getOrdersCount = gql`
	query GetOrdersCount {
		getOrdersCount
	}
`;
