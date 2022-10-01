import { gql } from 'graphql-request';

export const addUser = gql`
	mutation AddUser($name: String!, $email: String!, $password: String!) {
		addUser(name: $name, email: $email, password: $password) {
			message
		}
	}
`;

export const updateUserProfile = gql`
	mutation UpdateUserProfile($updateBody: UpdateUserProfileInput!) {
		updateUserProfile(updateBody: $updateBody) {
			id
			name
			email
			isAdmin
		}
	}
`;

export const deleteUser = gql`
	mutation DeleteUser($userId: String!) {
		deleteUser(userId: $userId) {
			message
		}
	}
`;

export const updateUser = gql`
	mutation UpdateUser($updateBody: UpdateUser!, $userId: String!) {
		updateUser(updateBody: $updateBody, userId: $userId) {
			id
			name
			email
			isAdmin
		}
	}
`;
