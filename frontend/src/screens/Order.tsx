import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import styled from 'styled-components';
// import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heading2, Heading3, Paragraph } from '../components/Typography';
import { useGetOrderQuery } from '../features/order/orderApiSlice';
import { Container } from '../components/Container';
import OrderItems from '../features/order/OrderItems';
import PayPalButton from '../features/order/PayPalButton';

const OrderContainer = styled(Container)`
	margin-top: 4rem;
	margin-bottom: 4rem;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
`;

const ContainerHeading = styled(Heading2)`
	margin-bottom: 1.5rem;
`;

const InfoContainer = styled.div`
	width: 63%;
	border-top: solid 1rem #a8dadc;
	border-radius: 1rem;
	padding: 2rem;
	box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.2);
`;

const SummaryContainer = styled.div`
	width: 33%;
	border-top: solid 1rem #a8dadc;
	border-radius: 1rem;
	padding: 2rem;
	box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.2);
`;

const Section = styled.div`
	&:not(:last-child) {
		border-bottom: 1px solid #a8dadc;
		margin-bottom: 2rem;
		padding-bottom: 2rem;
	}
`;

const SectionHeading = styled(Heading3)`
	margin-bottom: 1rem;
`;

const Order = () => {
	const [clientId, setClientId] = useState(
		'AfyQJ1di84kv9QLqvCswvNxqJRDwpYt-wA0kig2eHIcOoPjVN0KbThxmqw1HT25Crilu6Lrt5pBQTIJZ'
	);
	const orderId = useParams().orderId!;
	const { data: order, isLoading } = useGetOrderQuery({ orderId });

	console.log(order);

	const itemsPrice = order?.getOrderById.orderItems.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0
	);

	// useEffect(() => {
	// 	const getClientId = async () => {
	// 		try {
	// 			const { data } = await axios.get('/api/clientId');
	// 			console.log(data);
	// 			setClientId(data);
	// 		} catch (e) {
	// 			console.log(e);
	// 		}
	// 	};

	// 	getClientId();
	// }, []);

	console.log(order?.getOrderById.paidAt);

	return clientId ? (
		<PayPalScriptProvider
			options={{
				'client-id': clientId,
			}}
		>
			{isLoading ? (
				<div>Loading</div>
			) : (
				<OrderContainer>
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
										{order?.getOrderById.deliveredAt.toLocaleString()}
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
									<span>Paid on: {order?.getOrderById.paidAt.toString()}</span>
								) : (
									<span>Not Paid</span>
								)}
							</Paragraph>
						</Section>

						<Section>
							<SectionHeading>Order Items</SectionHeading>
							{order?.getOrderById.orderItems.map((orderItem) => (
								<OrderItems key={orderItem.productName} cartItem={orderItem} />
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

						<PayPalButton order={order!.getOrderById} />
					</SummaryContainer>
				</OrderContainer>
			)}
		</PayPalScriptProvider>
	) : (
		<div>Loading</div>
	);
};

export default Order;
