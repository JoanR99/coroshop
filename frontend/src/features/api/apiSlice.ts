import { createApi } from '@reduxjs/toolkit/query/react';
import { gql } from 'graphql-request';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';

export interface User {
	id: string;
	name: string;
	email: string;
	isAdmin: boolean;
}

export interface Review {
	id: string;
	rating: number;
	comment: string;
	user: Pick<User, 'id' | 'name'>;
}

export interface Product {
	id: string;
	name: string;
	image: string;
	brand: string;
	category: string;
	description: string;
	rating: number;
	numReviews: number;
	price: number;
	countInStock: number;
	reviews: Review[];
}

interface GetProductsResponse {
	getProducts: {
		products: Product[];
		page: number;
		pages: number;
	};
}

export const apiSlice = createApi({
	baseQuery: graphqlRequestBaseQuery({
		url: 'http://localhost:8080/api/graphql',
	}),
	endpoints: (builder) => ({
		getProducts: builder.query<
			GetProductsResponse,
			{ pageSize?: number; keyword?: string; pageNumber?: number }
		>({
			query: ({ pageSize, keyword, pageNumber }) => ({
				document: gql`
					query GetProducts(
						$pageSize: Float!
						$keyword: String!
						$pageNumber: Float!
					) {
						getProducts(
							pageSize: $pageSize
							keyword: $keyword
							pageNumber: $pageNumber
						) {
							page
							pages
							products {
								id
								name
								price
								brand
							}
						}
					}
				`,
				variables: {
					pageNumber,
					keyword,
					pageSize,
				},
			}),
		}),
	}),
});

export const { useGetProductsQuery } = apiSlice;
