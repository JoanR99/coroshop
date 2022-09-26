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
