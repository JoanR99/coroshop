import { apiSlice } from '../../app/api/apiSlice';
import { addUser } from './userMutations';
import { AddUserResponse } from './userTypes';

const userApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		addUser: builder.mutation<
			AddUserResponse,
			{ name: string; email: string; password: string }
		>({
			query: ({ name, email, password }) => ({
				document: addUser,
				variables: {
					name,
					email,
					password,
				},
			}),
		}),
	}),
});

export const { useAddUserMutation } = userApiSlice;
