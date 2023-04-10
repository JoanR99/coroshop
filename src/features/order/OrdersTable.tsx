import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../app/hooks';
import Button from '../../components/Button';
import { Heading4, Paragraph } from '../../components/Typography';
import { selectIsAdmin } from '../auth/authSlice';
import { Order } from './orderTypes';
import { Table, Td, Th } from '../../components/Table';
import { BsCheckLg } from 'react-icons/bs';
import { IoCloseSharp } from 'react-icons/io5';

type Props = {
	orders: Order[];
};

const OrdersTable = ({ orders }: Props) => {
	const navigate = useNavigate();
	const isAdmin = useAppSelector(selectIsAdmin);

	return orders.length === 0 ? (
		<Heading4>No orders to show</Heading4>
	) : (
		<Table>
			<thead>
				<tr>
					<Th>
						<Heading4>ID</Heading4>
					</Th>

					{isAdmin && (
						<Th>
							<Heading4>User</Heading4>
						</Th>
					)}

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
				{orders.map((userOrder) => (
					<tr key={userOrder.id}>
						<Td>
							<Paragraph>{userOrder.id}</Paragraph>
						</Td>
						{isAdmin && (
							<Td>
								<Paragraph>{userOrder.orderByName}</Paragraph>
							</Td>
						)}
						<Td>
							<Paragraph>
								{new Date(userOrder.createdAt).toLocaleDateString()}
							</Paragraph>
						</Td>
						<Td>
							<Paragraph>${userOrder.totalPrice}</Paragraph>
						</Td>

						<Td>
							<Paragraph
								css={{
									display: 'flex',
									columnGap: '0.5rem',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								{userOrder.isPaid ? (
									<>
										<BsCheckLg style={{ color: 'green', marginRight: '5px' }} />{' '}
										{new Date(Number(userOrder.paidAt)).toLocaleDateString()}
									</>
								) : (
									<>
										<IoCloseSharp
											style={{ color: 'red', height: '20px', width: '20px' }}
										/>
										{'Not paid'}
									</>
								)}
							</Paragraph>
						</Td>
						<Td>
							<Paragraph
								css={{
									display: 'flex',
									columnGap: '0.5rem',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								{userOrder.isDelivered ? (
									<>
										<BsCheckLg style={{ color: 'green', marginRight: '5px' }} />{' '}
										{new Date(
											Number(userOrder.deliveredAt)
										).toLocaleDateString()}
									</>
								) : (
									<>
										<IoCloseSharp
											style={{ color: 'red', height: '20px', width: '20px' }}
										/>
										{'Not delivered'}
									</>
								)}
							</Paragraph>
						</Td>
						<Td>
							<Button
								variant="main"
								onClick={() => navigate(`/order/${userOrder.id}`)}
							>
								Details
							</Button>
						</Td>
					</tr>
				))}
			</tbody>
		</Table>
	);
};

export default OrdersTable;
