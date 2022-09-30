import styled from 'styled-components';
import { Container, StyledContainer } from '../components/Container';
import { Heading2 } from '../components/Typography';
import UsersTable from '../features/user/UsersTable';

const UserListContainer = styled(StyledContainer)`
	margin-top: 2rem;
	margin-bottom: 2rem;
`;

const Users = () => {
	return (
		<Container>
			<UserListContainer>
				<Heading2>Users</Heading2>
				<UsersTable />
			</UserListContainer>
		</Container>
	);
};

export default Users;
