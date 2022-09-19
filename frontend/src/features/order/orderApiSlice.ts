import { string } from 'zod';
import { apiSlice } from '../../app/api/apiSlice';
import {
	addOrder,
	updateOrderToDelivered,
	updateOrderToPaid,
} from './orderMutations';
import { getOrder, getOrders } from './orderQueries';
import {
	AddOrderResponse,
	GetOrderResponse,
	GetOrdersResponse,
	AddOrderInput,
	UpdateOrderToPaid,
	UpdateOrderToPaidInput,
	UpdateOrderToDelivered,
} from './orderTypes';

const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getOrders: builder.query<GetOrdersResponse, null>({
			query: () => ({
				document: getOrders,
				variables: null,
			}),
		}),
		getOrder: builder.query<GetOrderResponse, { orderId: string }>({
			query: ({ orderId }) => ({
				document: getOrder,
				variables: { orderId },
			}),
		}),
		addOrder: builder.mutation<AddOrderResponse, AddOrderInput>({
			query: (orderBody) => ({
				document: addOrder,
				variables: { orderBody },
			}),
		}),
		updateOrderToPaid: builder.mutation<
			UpdateOrderToPaid,
			UpdateOrderToPaidInput
		>({
			query: ({ orderId, paymentResult }) => ({
				document: updateOrderToPaid,
				variables: {
					orderId,
					paymentResult,
				},
			}),
		}),
		updateOrderToDelivered: builder.mutation<
			UpdateOrderToDelivered,
			{ orderId: string }
		>({
			query: ({ orderId }) => ({
				document: updateOrderToDelivered,
				variables: {
					orderId,
				},
			}),
		}),
	}),
	overrideExisting: false,
});

export const {
	useGetOrdersQuery,
	useGetOrderQuery,
	useAddOrderMutation,
	useUpdateOrderToPaidMutation,
	useUpdateOrderToDeliveredMutation,
} = authApiSlice;
