import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Heading2, Paragraph } from '../components/Typography';
import {
	useGetOrderQuery,
	useUpdateOrderToDeliveredMutation,
} from '../features/order/orderApiSlice';
import { Container, StyledContainer } from '../components/Container';
import { Section, SectionHeading } from '../components/Section';
import OrderItems from '../features/order/OrderItems';

import { useAppSelector } from '../app/hooks';
import { selectIsAdmin } from '../features/auth/authSlice';
import Button from '../components/Button';
import Spinner from '../components/Spinner';
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
		<Container display="flex_start" space="top">
			<StyledContainer size="main">
				<Heading2 space="bottom">Order {order?.getOrderById.id}</Heading2>

				<Section>
					<SectionHeading>Shipping</SectionHeading>
					<Paragraph>
						<strong>Name: </strong> {order?.getOrderById.orderByName}
					</Paragraph>
				</Section>

				<Section>
					<SectionHeading>Address</SectionHeading>
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
				</Section>

				<Section>
					<SectionHeading>Payment Method</SectionHeading>
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
				</Section>

				<Section>
					<SectionHeading>Order Items</SectionHeading>
					{order?.getOrderById.orderItems.map((orderItem) => (
						<OrderItems key={orderItem.productName} item={orderItem} />
					))}
				</Section>
			</StyledContainer>

			<StyledContainer size="secondary">
				<Heading2 space="bottom">Order Summary</Heading2>
				<Section>
					<SectionHeading>Items</SectionHeading>
					<Paragraph>${itemsPrice}</Paragraph>
				</Section>
				<Section>
					<SectionHeading>Shipping</SectionHeading>
					<Paragraph>${order?.getOrderById.shippingPrice}</Paragraph>
				</Section>

				<Section>
					<SectionHeading>Tax</SectionHeading>
					<Paragraph>${order?.getOrderById.taxPrice}</Paragraph>
				</Section>

				<Section>
					<SectionHeading>Total</SectionHeading>
					<Paragraph>${order?.getOrderById.totalPrice}</Paragraph>
				</Section>

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
