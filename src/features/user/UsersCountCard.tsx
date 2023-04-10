import { FaUsers } from 'react-icons/fa';
import { Heading3, Heading4 } from '../../components/Typography';
import { StyledContainer } from '../../components/Container';
import { useGetUsersCountQuery } from './userApiSlice';
import { useNavigate } from 'react-router-dom';
import Flex from '../../components/Flex';

const UsersCountCard = () => {
	const { data, isLoading } = useGetUsersCountQuery(null);
	const navigate = useNavigate();

	const handleClick = () => navigate('/admin/user-list');

	return isLoading ? (
		<p>Loading</p>
	) : (
		<StyledContainer
			onClick={handleClick}
			css={{ cursor: 'pointer', padding: '1rem' }}
		>
			<Flex align="center" justify="center">
				<FaUsers
					style={{ height: '2.5rem', width: '2.5rem', marginRight: '1rem' }}
				/>{' '}
				<Heading4 size={{ '@initial': '1' }}>Total Users</Heading4>
			</Flex>

			<Heading3
				size={{ '@initial': '2' }}
				css={{ textAlign: 'center', mt: '1rem' }}
			>
				{data?.getUsersCount}
			</Heading3>
		</StyledContainer>
	);
};

export default UsersCountCard;
