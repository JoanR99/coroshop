import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MainButton } from '../../components/Button';
import { Heading4, Paragraph } from '../../components/Typography';
import { useGetUserOrdersQuery } from './orderApiSlice';

const Table = styled.table`
	width: 100%;
	padding: 1rem;
`;

const Th = styled.th`
	width: 16%;
`;

const Td = styled.td`
	width: 16%;
	text-align: center;
	padding: 0.5rem;
`;

const OrdersTable = () => {
	const { data, isLoading } = useGetUserOrdersQuery(null);
	const navigate = useNavigate();

	return isLoading ? (
		<div>Loading</div>
	) : (
		<Table>
			<thead>
				<tr>
					<Th>
						<Heading4>ID</Heading4>
					</Th>
					<Th>
						<Heading4>DATE</Heading4>
					</Th>
					<Th>
						<Heading4>TOTAL</Heading4>
					</Th>
					<Th>
						<Heading4>PAID</Heading4>
					</Th>

					<Th>
						<Heading4>DELIVERED</Heading4>
					</Th>
					<Th></Th>
				</tr>
			</thead>
			<tbody>
				{data?.getUserOrders.map((userOrder) => (
					<tr key={userOrder.id}>
						<Td>
							<Paragraph>{userOrder.id}</Paragraph>
						</Td>
						<Td>
							<Paragraph>
								{new Date(userOrder.createdAt).toLocaleDateString()}
							</Paragraph>
						</Td>
						<Td>
							<Paragraph>${userOrder.totalPrice}</Paragraph>
						</Td>

						<Td>
							<Paragraph>
								{userOrder.isPaid ? (
									new Date(Number(userOrder.paidAt)).toLocaleDateString()
								) : (
									<div>Not paid</div>
								)}
							</Paragraph>
						</Td>
						<Td>
							<Paragraph>
								{userOrder.isDelivered ? (
									new Date(Number(userOrder.deliveredAt)).toLocaleDateString()
								) : (
									<div>Not delivered</div>
								)}
							</Paragraph>
						</Td>
						<Td>
							<MainButton onClick={() => navigate(`/order/${userOrder.id}`)}>
								Details
							</MainButton>
						</Td>
					</tr>
				))}
			</tbody>
		</Table>
	);
};

export default OrdersTable;
