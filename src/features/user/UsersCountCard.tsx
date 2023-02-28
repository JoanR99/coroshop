import { FaUsers } from 'react-icons/fa';
import { Heading2, Heading4 } from '../../components/Typography';
import { StyledContainer } from '../../components/Container';
import { useGetUsersCountQuery } from './userApiSlice';
import { useNavigate } from 'react-router-dom';
import { styled } from '../../../stitches.config';

const CountCard = styled(StyledContainer, {
	cursor: 'pointer',
});

const HeadingContainer = styled('div', {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
});

const Count = styled(Heading2, {
	textAlign: 'center',
});

const UsersCountCard = () => {
	const { data, isLoading } = useGetUsersCountQuery(null);
	const navigate = useNavigate();

	const handleClick = () => navigate('/admin/user-list');

	return isLoading ? (
		<p>Loading</p>
	) : (
		<CountCard onClick={handleClick}>
			<HeadingContainer>
				<FaUsers
					style={{ height: '2.5rem', width: '2.5rem', marginRight: '1rem' }}
				/>{' '}
				<Heading4>Total Users</Heading4>
			</HeadingContainer>

			<Count>{data?.getUsersCount}</Count>
		</CountCard>
	);
};

export default UsersCountCard;
