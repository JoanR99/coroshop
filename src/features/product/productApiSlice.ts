import { apiSlice } from '../../app/api/apiSlice';
import { addProduct, deleteProduct, updateProduct } from './productMutations';
import { getProduct, getProducts, getProductsCount } from './productQueries';
import {
	GetProductsResponse,
	GetProductResponse,
	AddProductResponse,
	AddProductInput,
	DeleteProductResponse,
	DeleteProductInput,
	UpdateProductResponse,
	UpdateProductInput,
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
					getProductsInput: {
						pageNumber,
						keyword,
						pageSize,
					},
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
		getProductsCount: builder.query<{ getProductsCount: number }, null>({
			query: () => ({
				document: getProductsCount,
				variables: null,
			}),
		}),
		addProduct: builder.mutation<AddProductResponse, AddProductInput>({
			query: (addProductInput) => ({
				document: addProduct,
				variables: {
					addProductInput,
				},
			}),
			invalidatesTags: ['products'],
		}),
		deleteProduct: builder.mutation<DeleteProductResponse, DeleteProductInput>({
			query: ({ productId }) => ({
				document: deleteProduct,
				variables: {
					productId,
				},
			}),
			invalidatesTags: ['products'],
		}),
		updateProduct: builder.mutation<UpdateProductResponse, UpdateProductInput>({
			query: ({ productBody, productId }) => ({
				document: updateProduct,
				variables: {
					productBody,
					productId,
				},
			}),
			invalidatesTags: ['products'],
		}),
	}),
	overrideExisting: false,
});

export const {
	useGetProductsQuery,
	useGetProductQuery,
	useGetProductsCountQuery,
	useAddProductMutation,
	useDeleteProductMutation,
	useUpdateProductMutation,
} = productApi;
