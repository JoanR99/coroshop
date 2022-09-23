import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Paragraph } from '../components/Typography';
import { useGetOrderQuery } from '../features/order/orderApiSlice';
import {
	FlexContainer,
	InfoContainer,
	SummaryContainer,
	ContainerHeading,
} from '../components/Container';
import { Section, SectionHeading } from '../components/Section';
import OrderItems from '../features/order/OrderItems';
import PayPalButton from '../features/order/PayPalButton';

const Order = () => {
	const [clientId, setClientId] = useState('');
	const orderId = useParams().orderId!;
	const { data: order, isLoading } = useGetOrderQuery({ orderId });

	const itemsPrice = order?.getOrderById.orderItems.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0
	);

	useEffect(() => {
		const getClientId = async () => {
			try {
				const { data } = await axios.get('/api/clientId');
				setClientId(data);
			} catch (e) {
				console.log(e);
			}
		};

		if (order?.getOrderById.paymentMethod === 'PayPal') {
			getClientId();
		}
	}, [order?.getOrderById.paymentMethod]);

	return isLoading ? (
		<div>Loading</div>
	) : (
		<FlexContainer>
			<InfoContainer>
				<ContainerHeading>Order {order?.getOrderById.id}</ContainerHeading>

				<Section>
					<SectionHeading>Shipping</SectionHeading>
					<Paragraph>
						<strong>Name: </strong> {order?.getOrderById.orderBy}
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
			</InfoContainer>

			<SummaryContainer>
				<ContainerHeading>Order Summary</ContainerHeading>
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

				{clientId && (
					<PayPalScriptProvider options={{ 'client-id': clientId }}>
						<PayPalButton order={order!.getOrderById} />
					</PayPalScriptProvider>
				)}
			</SummaryContainer>
		</FlexContainer>
	);
};

export default Order;
