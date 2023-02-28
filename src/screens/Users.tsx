import { StyledContainer } from '../components/Container';
import { Heading2 } from '../components/Typography';
import UsersTable from '../features/user/UsersTable';

const Users = () => {
	return (
		<StyledContainer>
			<Heading2>Users</Heading2>
			<UsersTable />
		</StyledContainer>
	);
};

export default Users;
