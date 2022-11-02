import styled from 'styled-components';

import { Container, StyledContainer } from '../components/Container';
import { Heading2 } from '../components/Typography';
import UsersTable from '../features/user/UsersTable';

const Users = () => {
	return (
		<Container>
			<StyledContainer>
				<Heading2>Users</Heading2>
				<UsersTable />
			</StyledContainer>
		</Container>
	);
};

export default Users;
