import { apiSlice } from '../../app/api/apiSlice';
import { addReview, deleteReview } from './reviewMutations';
import { getReviews } from './reviewQueries';
import {
	AddReviewResponse,
	DeleteReviewResponse,
	GetReviewsResponse,
} from './reviewTypes';

const reviewApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getReviews: builder.query<GetReviewsResponse, { productId: string }>({
			query: ({ productId }) => ({
				document: getReviews,
				variables: { productId },
			}),
			providesTags: (_result, _error, params) => [
				{ type: 'products', productId: params.productId },
			],
		}),
		addReview: builder.mutation<
			AddReviewResponse,
			{ productId: string; comment: string; rating: number }
		>({
			query: ({ productId, comment, rating }) => ({
				document: addReview,
				variables: {
					productId,
					reviewBody: {
						comment,
						rating,
					},
				},
			}),
			invalidatesTags: (_result, _error, params) => [
				{ type: 'products', productId: params.productId },
			],
		}),
		deleteReview: builder.mutation<
			DeleteReviewResponse,
			{ reviewId: string; productId: string }
		>({
			query: ({ reviewId }) => ({
				document: deleteReview,
				variables: { reviewId },
			}),
			invalidatesTags: (_result, _error, params) => [
				{ type: 'products', productId: params.productId },
			],
		}),
	}),
	overrideExisting: false,
});

export const {
	useGetReviewsQuery,
	useAddReviewMutation,
	useDeleteReviewMutation,
} = reviewApi;
