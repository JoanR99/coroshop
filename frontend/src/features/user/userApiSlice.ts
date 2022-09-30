import { apiSlice } from '../../app/api/apiSlice';
import { addUser, deleteUser, updateUserProfile } from './userMutations';
import { getUserProfile, getUsers } from './userQueries';
import {
	AddUserInput,
	AddUserResponse,
	UpdateUserProfileResponse,
	UpdateUserProfileInput,
	GetUserProfileResponse,
	GetUsersResponse,
	GetUsersInput,
	DeleteUserResponse,
	DeleteUserInput,
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
		getUsers: builder.query<GetUsersResponse, GetUsersInput>({
			query: ({ pageSize, keyword, pageNumber }) => ({
				document: getUsers,
				variables: {
					pageSize,
					keyword,
					pageNumber,
				},
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
		deleteUser: builder.mutation<DeleteUserResponse, DeleteUserInput>({
			query: ({ userId }) => ({
				document: deleteUser,
				variables: {
					userId,
				},
			}),
			invalidatesTags: ['users'],
		}),
	}),
});

export const {
	useGetUserProfileQuery,
	useGetUsersQuery,
	useAddUserMutation,
	useUpdateUserProfileMutation,
	useDeleteUserMutation,
} = userApiSlice;
