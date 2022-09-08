import { apiSlice } from '../../app/api/apiSlice';
import { loginMutation, logoutMutation } from './authMutations';
import { LoginResponse, LogoutResponse } from './authTypes';

const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation<LoginResponse, { email: string; password: string }>(
			{
				query: ({ email, password }) => ({
					document: loginMutation,
					variables: {
						email,
						password,
					},
				}),
			}
		),
		logout: builder.mutation<LogoutResponse, null>({
			query: () => ({
				document: logoutMutation,
				variables: null,
			}),
		}),
	}),
	overrideExisting: false,
});

export const { useLoginMutation, useLogoutMutation } = authApiSlice;
