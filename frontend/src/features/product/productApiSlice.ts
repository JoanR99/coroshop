import { apiSlice } from '../../app/api/apiSlice';
import { getProduct, getProducts } from './productQueries';
import { GetProductsResponse, GetProductResponse } from './productTypes';

const productApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProducts: builder.query<
			GetProductsResponse,
			{ pageSize?: number; keyword?: string; pageNumber?: number }
		>({
			query: ({ pageSize, keyword, pageNumber }) => ({
				document: getProducts,
				variables: {
					pageNumber,
					keyword,
					pageSize,
				},
			}),
		}),
		getProduct: builder.query<GetProductResponse, { productId: string }>({
			query: ({ productId }) => ({
				document: getProduct,
				variables: { productId },
			}),
		}),
	}),
	overrideExisting: false,
});

export const { useGetProductsQuery, useGetProductQuery } = productApi;
