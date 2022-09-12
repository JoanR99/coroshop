import { apiSlice } from '../../app/api/apiSlice';
import { addProduct } from './productMutations';
import { getProduct, getProducts } from './productQueries';
import {
	GetProductsResponse,
	GetProductResponse,
	AddProductResponse,
	AddProductInput,
} from './productTypes';

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
			providesTags: ['products'],
		}),
		getProduct: builder.query<GetProductResponse, { productId: string }>({
			query: ({ productId }) => ({
				document: getProduct,
				variables: { productId },
			}),
			providesTags: ['products'],
		}),
		addProduct: builder.mutation<AddProductResponse, AddProductInput>({
			query: (product) => ({
				document: addProduct,
				variables: {
					product,
				},
			}),
		}),
	}),
	overrideExisting: false,
});

export const {
	useGetProductsQuery,
	useGetProductQuery,
	useAddProductMutation,
} = productApi;
