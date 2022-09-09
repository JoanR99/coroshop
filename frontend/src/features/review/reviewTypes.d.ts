import { string } from 'zod';
import { User } from '../user/userTypes';

export interface Review {
	id: string;
	rating: number;
	comment: string;
	author: string;
	authorName: string;
}

export interface GetReviewResponse {
	getReviews: Review[];
}

export interface AddReviewResponse {
	addReview: { message: string };
}
