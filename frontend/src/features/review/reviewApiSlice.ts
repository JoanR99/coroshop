import { apiSlice } from '../../app/api/apiSlice';
import { addReview } from './reviewMutations';
import { getReviews } from './reviewQueries';
import { AddReviewResponse, GetReviewResponse } from './reviewTypes';

const reviewApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getReviews: builder.query<GetReviewResponse, { productId: string }>({
			query: ({ productId }) => ({
				document: getReviews,
				variables: { productId },
			}),
			providesTags: ['reviews'],
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
			invalidatesTags: ['reviews'],
		}),
	}),
	overrideExisting: false,
});

export const { useGetReviewsQuery, useAddReviewMutation } = reviewApi;
