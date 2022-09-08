import { gql } from 'graphql-request';

export const loginMutation = gql`
	mutation Mutation($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			accessToken
		}
	}
`;

export const logoutMutation = gql`
	mutation Mutation {
		logout {
			message
		}
	}
`;
