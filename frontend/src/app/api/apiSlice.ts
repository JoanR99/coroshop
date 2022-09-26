import { createApi } from '@reduxjs/toolkit/query/react';
import {
	GraphQLClient,
	ClientError,
} from '@rtk-query/graphql-request-base-query/node_modules/graphql-request/dist/index';

import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';
import { RootState } from '../store';
import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import {
	clearCredentials,
	setCredentials,
} from '../../features/auth/authSlice';
import getNewAccessToken from '../../features/auth/getNewAccessToken';

const client = new GraphQLClient('http://localhost:8080/api/graphql', {
	credentials: 'include',
});

const baseQuery = graphqlRequestBaseQuery({
	client,
	prepareHeaders: (headers, { getState }) => {
		const state = getState as () => RootState;
		const accessToken = state().auth?.accessToken;
		if (accessToken) {
			headers.set('authorization', `Bearer ${accessToken}`);
		}
		return headers;
	},
});

const baseQueryWithReAuth = async (
	args: { document: string; variables: any },
	api: BaseQueryApi,
	extraOptions: Partial<Pick<ClientError, 'request' | 'response'>>
) => {
	let result = await baseQuery(args, api, extraOptions);

	if (
		result?.error?.message?.includes(
			'Access denied! You need to be authorized to perform this action!'
		)
	) {
		console.log('sending refresh token');
		const accessToken = await getNewAccessToken();

		if (accessToken) {
			api.dispatch(setCredentials({ accessToken }));

			result = await baseQuery(args, api, extraOptions);
		} else {
			api.dispatch(clearCredentials());
		}
	}

	return result;
};

export const apiSlice = createApi({
	baseQuery: baseQueryWithReAuth,
	tagTypes: ['products', 'reviews', 'orders'],
	endpoints: () => ({}),
});
