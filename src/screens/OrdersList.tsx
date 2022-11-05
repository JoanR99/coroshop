import { StyledContainer } from '../components/Container';
import { Heading2 } from '../components/Typography';
import { useGetOrdersQuery } from '../features/order/orderApiSlice';
import OrdersTable from '../features/order/OrdersTable';

const OrdersList = () => {
	const { data, isLoading } = useGetOrdersQuery(null);

	return isLoading ? (
		<div>Loading...</div>
	) : (
		<StyledContainer>
			<Heading2>Orders</Heading2>
			<OrdersTable orders={data!.getOrders} />
		</StyledContainer>
	);
};

export default OrdersList;
