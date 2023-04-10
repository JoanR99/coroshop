import { StyledContainer } from '../components/Container';
import { Heading2 } from '../components/Typography';
import UsersTable from '../features/user/UsersTable';

const Users = () => {
	return (
		<StyledContainer css={{ mb: '2rem', overflowY: 'scroll' }}>
			<Heading2
				size={{
					'@initial': '3',
					'@md': '4',
				}}
			>
				Users
			</Heading2>
			<UsersTable />
		</StyledContainer>
	);
};

export default Users;
