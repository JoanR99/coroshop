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
			{
				pageSize?: number;
				keyword?: string;
				pageNumber?: number;
				category?: string;
				minPriceLimit?: number;
				maxPriceLimit?: number;
				minRating?: number;
			}
		>({
			query: ({
				pageSize,
				keyword,
				pageNumber,
				category,
				minPriceLimit,
				maxPriceLimit,
				minRating,
			}) => ({
				document: getProducts,
				variables: {
					getProductsInput: {
						pageNumber,
						keyword,
						pageSize,
						category,
						minPriceLimit,
						maxPriceLimit,
						minRating,
					},
				},
			}),
			providesTags: (result, error, params) => [
				{ type: 'products', ...params },
			],
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
			providesTags: ['products'],
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
