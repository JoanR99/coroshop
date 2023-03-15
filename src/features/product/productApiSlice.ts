import { apiSlice } from '../../app/api/apiSlice';
import { addProduct, deleteProduct, updateProduct } from './productMutations';
import {
	getProduct,
	getProducts,
	getProductsCount,
	getProductsGroupedByCategory,
	getProductsOverviewList,
} from './productQueries';
import {
	GetProductsResponse,
	GetProductResponse,
	AddProductResponse,
	AddProductInput,
	DeleteProductResponse,
	DeleteProductInput,
	UpdateProductResponse,
	UpdateProductInput,
	GetProductsGroupedByCategoryResponse,
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
			providesTags: (_result, error, params) => [
				{ type: 'products', ...params },
			],
		}),
		getProductOverviewList: builder.query<
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
				document: getProductsOverviewList,
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
			providesTags: (_result, _error, params) => [
				{ type: 'products', ...params },
			],
		}),
		getProductsGroupedByCategory: builder.query<
			GetProductsGroupedByCategoryResponse,
			null
		>({
			query: () => ({
				document: getProductsGroupedByCategory,
				variables: null,
			}),
		}),
		getProduct: builder.query<GetProductResponse, { productId: string }>({
			query: ({ productId }) => ({
				document: getProduct,
				variables: { productId },
			}),
			providesTags: (_result, _error, params) => [
				{ type: 'products', ...params },
			],
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
			invalidatesTags: (_result, _error, params) => [
				{ type: 'products', productId: params.productId },
			],
		}),
	}),
	overrideExisting: false,
});

export const {
	useGetProductsQuery,
	useGetProductOverviewListQuery,
	useGetProductQuery,
	useGetProductsCountQuery,
	useGetProductsGroupedByCategoryQuery,
	useAddProductMutation,
	useDeleteProductMutation,
	useUpdateProductMutation,
} = productApi;
