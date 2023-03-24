import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Heading2, Paragraph } from '../components/Typography';
import {
	useGetOrderQuery,
	useUpdateOrderToDeliveredMutation,
} from '../features/order/orderApiSlice';
import { Container, StyledContainer } from '../components/Container';
import { FlexSection } from '../components/Section';
import OrderItems from '../features/order/OrderItems';

import { useAppSelector } from '../app/hooks';
import { selectIsAdmin } from '../features/auth/authSlice';
import Button from '../components/Button';
import PaypalPayment from '../features/order/PaypalPayment';
import StripePayment from '../features/order/StripePayment';

const Order = () => {
	const isAdmin = useAppSelector(selectIsAdmin);
	const orderId = useParams().orderId!;
	const { data: order, isLoading } = useGetOrderQuery({ orderId });
	const [updateDelivered, { isLoading: loadingUpdate }] =
		useUpdateOrderToDeliveredMutation();

	const itemsPrice = order?.getOrderById.orderItems.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0
	);

	const updateHandler = async () => {
		const id = toast.loading('Updating...', { theme: 'light' });
		try {
			await updateDelivered({ orderId }).unwrap();
			toast.update(id, {
				render: 'Update Success',
				type: 'success',
				isLoading: false,
				hideProgressBar: true,
				autoClose: 1000,
				theme: 'light',
			});
		} catch (e) {
			toast.update(id, {
				render: 'Update Fail',
				type: 'error',
				isLoading: false,
				hideProgressBar: true,
				autoClose: 1000,
				theme: 'light',
			});
		}
	};

	return isLoading ? (
		<div>Loading</div>
	) : (
		<Container>
			<StyledContainer size="main">
				<Heading2>Order {order?.getOrderById.id}</Heading2>

				<FlexSection>
					<Heading2>Shipping</Heading2>
					<Paragraph>
						<strong>Name: </strong> {order?.getOrderById.orderByName}
					</Paragraph>
				</FlexSection>

				<FlexSection>
					<Heading2>Address</Heading2>
					<Paragraph>
						<strong>Address: </strong>
						{order?.getOrderById.shippingAddress.address},{' '}
						{order?.getOrderById.shippingAddress.city}{' '}
						{order?.getOrderById.shippingAddress.postalCode},{' '}
						{order?.getOrderById.shippingAddress.country}
					</Paragraph>
					<Paragraph>
						{order?.getOrderById.isDelivered ? (
							<span>
								Delivered on:{' '}
								{new Date(
									Number(order!.getOrderById.deliveredAt)
								).toLocaleString()}
							</span>
						) : (
							<span>Not delivered</span>
						)}
					</Paragraph>
				</FlexSection>

				<FlexSection>
					<Heading2>Payment Method</Heading2>
					<Paragraph>
						<strong>Method: </strong>
						{order?.getOrderById.paymentMethod}
					</Paragraph>
					<Paragraph>
						{order?.getOrderById.isPaid ? (
							<span>
								Paid on:{' '}
								{new Date(Number(order!.getOrderById.paidAt)).toLocaleString()}
							</span>
						) : (
							<span>Not Paid</span>
						)}
					</Paragraph>
				</FlexSection>

				<FlexSection>
					<Heading2>Order Items</Heading2>
					{order?.getOrderById.orderItems.map((orderItem) => (
						<OrderItems key={orderItem.productName} item={orderItem} />
					))}
				</FlexSection>
			</StyledContainer>

			<StyledContainer size="secondary">
				<Heading2>Order Summary</Heading2>
				<FlexSection>
					<Heading2>Items</Heading2>
					<Paragraph>${itemsPrice}</Paragraph>
				</FlexSection>
				<FlexSection>
					<Heading2>Shipping</Heading2>
					<Paragraph>${order?.getOrderById.shippingPrice}</Paragraph>
				</FlexSection>

				<FlexSection>
					<Heading2>Tax</Heading2>
					<Paragraph>${order?.getOrderById.taxPrice}</Paragraph>
				</FlexSection>

				<FlexSection>
					<Heading2>Total</Heading2>
					<Paragraph>${order?.getOrderById.totalPrice}</Paragraph>
				</FlexSection>

				{!order!.getOrderById.isPaid &&
					!isAdmin &&
					(order!.getOrderById.paymentMethod == 'PayPal' ? (
						<PaypalPayment order={order!.getOrderById} />
					) : (
						<StripePayment order={order!.getOrderById} />
					))}

				{loadingUpdate ? (
					<div>Loading</div>
				) : (
					isAdmin &&
					order!.getOrderById.isPaid &&
					!order!.getOrderById.isDelivered && (
						<Button variant="main" onClick={updateHandler}>
							Mark as delivered
						</Button>
					)
				)}
			</StyledContainer>
		</Container>
	);
};

export default Order;
