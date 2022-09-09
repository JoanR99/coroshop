import { gql } from 'graphql-request';

export const addUser = gql`
	mutation AddUser($name: String!, $email: String!, $password: String!) {
		addUser(name: $name, email: $email, password: $password) {
			message
		}
	}
`;
