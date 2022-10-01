import { Container } from '../components/Container';
import { Heading2 } from '../components/Typography';
import { useGetOrdersQuery } from '../features/order/orderApiSlice';
import OrdersTable from '../features/order/OrdersTable';

const OrdersList = () => {
	const { data, isLoading } = useGetOrdersQuery(null);

	return isLoading ? (
		<div>Loading...</div>
	) : (
		<Container>
			<Heading2>Orders</Heading2>
			<OrdersTable orders={data!.getOrders} />
		</Container>
	);
};

export default OrdersList;
