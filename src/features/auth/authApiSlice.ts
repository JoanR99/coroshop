import { apiSlice } from '../../app/api/apiSlice';
import { loginMutation, logoutMutation } from './authMutations';
import { LoginInput, LoginResponse, LogoutResponse } from './authTypes';

const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation<LoginResponse, LoginInput>({
			query: ({ email, password }) => ({
				document: loginMutation,
				variables: {
					loginInput: {
						email,
						password,
					},
				},
			}),
		}),
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
