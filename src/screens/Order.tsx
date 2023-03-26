import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
	Heading2,
	Heading3,
	Heading4,
	Paragraph,
} from '../components/Typography';
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
		<Container
			css={{
				my: '4rem',
				display: 'flex',
				flexDirection: 'column',
				gap: '4rem',
				'@lg': { flexDirection: 'row', alignItems: 'self-start' },
			}}
		>
			<StyledContainer css={{ width: '100%', '@lg': { width: '66%' } }}>
				<Heading3
					size={{
						'@initial': '2',
						'@md': '3',
					}}
					css={{ mb: '2rem' }}
				>
					Order {order?.getOrderById.id}
				</Heading3>

				<FlexSection direction="column" css={{ mb: '1rem' }}>
					<Heading4
						size={{
							'@initial': '1',
							'@md': '2',
						}}
					>
						Shipping
					</Heading4>
					<Paragraph
						fontSize={{
							'@initial': '2',
							'@md': '3',
						}}
					>
						<strong>Name: </strong> {order?.getOrderById.orderByName}
					</Paragraph>
					<Paragraph
						fontSize={{
							'@initial': '2',
							'@md': '3',
						}}
					>
						<strong>Address: </strong>
						{order?.getOrderById.shippingAddress.address},{' '}
						{order?.getOrderById.shippingAddress.city}{' '}
						{order?.getOrderById.shippingAddress.postalCode},{' '}
						{order?.getOrderById.shippingAddress.country}
					</Paragraph>
					<Paragraph
						fontSize={{
							'@initial': '2',
							'@md': '3',
						}}
					>
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

				<FlexSection direction="column" css={{ mb: '1rem' }}>
					<Heading4
						size={{
							'@initial': '1',
							'@md': '2',
						}}
					>
						Payment Method
					</Heading4>
					<Paragraph
						fontSize={{
							'@initial': '2',
							'@md': '3',
						}}
					>
						<strong>Method: </strong>
						{order?.getOrderById.paymentMethod}
					</Paragraph>
					<Paragraph
						fontSize={{
							'@initial': '2',
							'@md': '3',
						}}
					>
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

				<FlexSection direction="column" css={{ mb: '1rem' }}>
					<Heading4
						size={{
							'@initial': '1',
							'@md': '2',
						}}
					>
						Order Items
					</Heading4>
					{order?.getOrderById.orderItems.map((orderItem) => (
						<OrderItems key={orderItem.productName} item={orderItem} />
					))}
				</FlexSection>
			</StyledContainer>

			<StyledContainer css={{ width: '100%', '@lg': { width: '33%' } }}>
				<Heading3
					size={{
						'@initial': '2',
						'@md': '3',
					}}
					css={{ mb: '2rem' }}
				>
					Order Summary
				</Heading3>
				<FlexSection direction="column" css={{ mb: '1rem' }}>
					<Heading4
						size={{
							'@initial': '1',
							'@md': '2',
						}}
					>
						Items
					</Heading4>
					<Paragraph
						fontSize={{
							'@initial': '2',
							'@md': '3',
						}}
					>
						${itemsPrice}
					</Paragraph>
				</FlexSection>
				<FlexSection direction="column" css={{ mb: '1rem' }}>
					<Heading4
						size={{
							'@initial': '1',
							'@md': '2',
						}}
					>
						Shipping
					</Heading4>
					<Paragraph
						fontSize={{
							'@initial': '2',
							'@md': '3',
						}}
					>
						${order?.getOrderById.shippingPrice}
					</Paragraph>
				</FlexSection>

				<FlexSection direction="column" css={{ mb: '1rem' }}>
					<Heading4
						size={{
							'@initial': '1',
							'@md': '2',
						}}
					>
						Tax
					</Heading4>
					<Paragraph
						fontSize={{
							'@initial': '2',
							'@md': '3',
						}}
					>
						${order?.getOrderById.taxPrice}
					</Paragraph>
				</FlexSection>

				<FlexSection direction="column" css={{ mb: '1rem' }}>
					<Heading4
						size={{
							'@initial': '1',
							'@md': '2',
						}}
					>
						Total
					</Heading4>
					<Paragraph
						fontSize={{
							'@initial': '2',
							'@md': '3',
						}}
					>
						${order?.getOrderById.totalPrice}
					</Paragraph>
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
						<Button
							variant="main"
							onClick={updateHandler}
							size={{
								'@initial': 'small',
								'@md': 'normal',
							}}
							fontSize="1"
						>
							Mark as delivered
						</Button>
					)
				)}
			</StyledContainer>
		</Container>
	);
};

export default Order;
