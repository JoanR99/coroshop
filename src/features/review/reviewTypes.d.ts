import { string } from 'zod';

import { User } from '../user/userTypes';

export interface Review {
	id: string;
	rating: number;
	comment: string;
	author: string;
	authorName: string;
	product: string;
}

export interface GetReviewsResponse {
	getReviews: Review[];
}

export interface AddReviewResponse {
	addReview: { message: string };
}

export interface DeleteReviewResponse {
	deleteReview: { message: string };
}
