import { BiNotepad } from 'react-icons/bi';
import { Heading3, Heading4 } from '../../components/Typography';
import { StyledContainer } from '../../components/Container';
import { useNavigate } from 'react-router-dom';
import { useGetOrdersCountQuery } from './orderApiSlice';
import Flex from '../../components/Flex';

const OrdersCountCard = () => {
	const { data, isLoading } = useGetOrdersCountQuery(null);
	const navigate = useNavigate();

	const handleClick = () => navigate('/admin/order-list');

	return isLoading ? (
		<p>Loading</p>
	) : (
		<StyledContainer
			onClick={handleClick}
			css={{ cursor: 'pointer', padding: '1rem' }}
		>
			<Flex align="center" justify="center">
				<BiNotepad
					style={{ height: '2.5rem', width: '2.5rem', marginRight: '1rem' }}
				/>{' '}
				<Heading4 size={{ '@initial': '1' }}>Total Orders</Heading4>
			</Flex>

			<Heading3
				size={{ '@initial': '2' }}
				css={{ textAlign: 'center', mt: '1rem' }}
			>
				{data?.getOrdersCount}
			</Heading3>
		</StyledContainer>
	);
};

export default OrdersCountCard;
