import { apiSlice } from '../../app/api/apiSlice';
import { addUser, updateUserProfile } from './userMutations';
import { getUserProfile } from './userQueries';
import {
	AddUserInput,
	AddUserResponse,
	UpdateUserProfileResponse,
	UpdateUserProfileInput,
	GetUserProfileResponse,
} from './userTypes';

const userApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUserProfile: builder.query<GetUserProfileResponse, null>({
			query: () => ({
				document: getUserProfile,
				variables: null,
			}),
			providesTags: ['users'],
		}),
		addUser: builder.mutation<AddUserResponse, AddUserInput>({
			query: ({ name, email, password }) => ({
				document: addUser,
				variables: {
					name,
					email,
					password,
				},
			}),
			invalidatesTags: ['users'],
		}),
		updateUserProfile: builder.mutation<
			UpdateUserProfileResponse,
			UpdateUserProfileInput
		>({
			query: (updateBody) => ({
				document: updateUserProfile,
				variables: { updateBody },
			}),
			invalidatesTags: ['users'],
		}),
	}),
});

export const {
	useGetUserProfileQuery,
	useAddUserMutation,
	useUpdateUserProfileMutation,
} = userApiSlice;
