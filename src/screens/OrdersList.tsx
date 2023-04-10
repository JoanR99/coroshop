import { StyledContainer } from '../components/Container';
import Spinner from '../components/Spinner';
import { Heading2 } from '../components/Typography';
import { useGetOrdersQuery } from '../features/order/orderApiSlice';
import OrdersTable from '../features/order/OrdersTable';

const OrdersList = () => {
	const { data, isLoading } = useGetOrdersQuery(null);

	return isLoading ? (
		<Spinner />
	) : (
		<StyledContainer css={{ mb: '2rem', overflowY: 'scroll' }}>
			<Heading2
				size={{
					'@initial': '3',
					'@md': '4',
				}}
			>
				Orders
			</Heading2>
			<OrdersTable orders={data!.getOrders} />
		</StyledContainer>
	);
};

export default OrdersList;
