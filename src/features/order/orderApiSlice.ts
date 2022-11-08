import { apiSlice } from '../../app/api/apiSlice';
import {
	addOrder,
	updateOrderToDelivered,
	updateOrderToPaid,
} from './orderMutations';
import {
	getOrder,
	getOrders,
	getOrdersCount,
	getUserOrders,
} from './orderQueries';
import {
	AddOrderResponse,
	GetOrderResponse,
	GetOrdersResponse,
	AddOrderInput,
	UpdateOrderToPaidResponse,
	UpdateOrderToPaidInput,
	UpdateOrderToDeliveredResponse,
	GetUserOrdersResponse,
} from './orderTypes';

const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getOrders: builder.query<GetOrdersResponse, null>({
			query: () => ({
				document: getOrders,
				variables: null,
			}),
			providesTags: ['orders'],
		}),
		getOrder: builder.query<GetOrderResponse, { orderId: string }>({
			query: ({ orderId }) => ({
				document: getOrder,
				variables: { orderId },
			}),
			providesTags: (result, error, { orderId }) => [
				{ type: 'orders', orderId },
			],
		}),
		getUserOrders: builder.query<GetUserOrdersResponse, null>({
			query: () => ({
				document: getUserOrders,
				variables: null,
			}),
		}),
		getOrdersCount: builder.query<{ getOrdersCount: number }, null>({
			query: () => ({
				document: getOrdersCount,
				variables: null,
			}),
			providesTags: ['orders'],
		}),
		addOrder: builder.mutation<AddOrderResponse, AddOrderInput>({
			query: (orderBody) => ({
				document: addOrder,
				variables: { orderBody },
			}),
			invalidatesTags: ['orders'],
		}),
		updateOrderToPaid: builder.mutation<
			UpdateOrderToPaidResponse,
			UpdateOrderToPaidInput
		>({
			query: ({ orderId, paymentResultBody }) => ({
				document: updateOrderToPaid,
				variables: {
					orderId,
					paymentResultBody,
				},
			}),
			invalidatesTags: ['orders'],
		}),
		updateOrderToDelivered: builder.mutation<
			UpdateOrderToDeliveredResponse,
			{ orderId: string }
		>({
			query: ({ orderId }) => ({
				document: updateOrderToDelivered,
				variables: {
					orderId,
				},
			}),
			invalidatesTags: ['orders'],
		}),
	}),
	overrideExisting: false,
});

export const {
	useGetOrdersQuery,
	useGetOrderQuery,
	useGetOrdersCountQuery,
	useAddOrderMutation,
	useUpdateOrderToPaidMutation,
	useUpdateOrderToDeliveredMutation,
	useGetUserOrdersQuery,
} = authApiSlice;
