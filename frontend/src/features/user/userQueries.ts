import { gql } from 'graphql-request';

export const getUserProfile = gql`
	query GetUserProfile {
		getUserProfile {
			id
			name
			email
			isAdmin
		}
	}
`;

export const getUsers = gql`
	query getUsers($pageSize: Float!, $keyword: String!, $pageNumber: Float!) {
		getUsers(pageSize: $pageSize, keyword: $keyword, pageNumber: $pageNumber) {
			users {
				id
				name
				email
				isAdmin
			}
			page
			pages
		}
	}
`;

export const getUser = gql`
	query GetUser($userId: String!) {
		getUser(userId: $userId) {
			id
			name
			email
			isAdmin
		}
	}
`;
