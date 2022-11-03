import styled from 'styled-components';
import { BiNotepad } from 'react-icons/bi';
import { Heading2, Heading4 } from '../../components/Typography';
import { StyledContainer } from '../../components/Container';
import { useNavigate } from 'react-router-dom';
import { useGetOrdersCountQuery } from './orderApiSlice';

const CountCard = styled(StyledContainer)`
	cursor: pointer;
`;

const HeadingContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Count = styled(Heading2)`
	text-align: center;
`;

const OrdersCountCard = () => {
	const { data, isLoading } = useGetOrdersCountQuery(null);
	const navigate = useNavigate();

	const handleClick = () => navigate('/admin/order-list');

	return isLoading ? (
		<p>Loading</p>
	) : (
		<CountCard onClick={handleClick}>
			<HeadingContainer>
				<BiNotepad
					style={{ height: '2.5rem', width: '2.5rem', marginRight: '1rem' }}
				/>{' '}
				<Heading4>Total Orders</Heading4>
			</HeadingContainer>

			<Count>{data?.getOrdersCount}</Count>
		</CountCard>
	);
};

export default OrdersCountCard;
