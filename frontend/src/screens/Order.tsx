import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Elements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { stripePromise } from '../features/order/stripe';
import { Paragraph } from '../components/Typography';
import {
	useGetOrderQuery,
	useUpdateOrderToDeliveredMutation,
} from '../features/order/orderApiSlice';
import {
	FlexContainer,
	InfoContainer,
	SummaryContainer,
	ContainerHeading,
} from '../components/Container';
import { Section, SectionHeading } from '../components/Section';
import OrderItems from '../features/order/OrderItems';
import PayPalButton from '../features/order/PayPalButton';
import StripeForm from '../features/order/StripeForm';
import stripePayment from '../features/order/stripePayment';
import { useAppSelector } from '../app/hooks';
import { selectIsAdmin } from '../features/auth/authSlice';
import { MainButton } from '../components/Button';
import { toast } from 'react-toastify';

const Order = () => {
	const isAdmin = useAppSelector(selectIsAdmin);
	const [clientId, setClientId] = useState('');
	const [clientSecret, setClientSecret] = useState('');
	const [paymentLoading, setPaymentLoading] = useState(false);
	const orderId = useParams().orderId!;
	const { data: order, isLoading } = useGetOrderQuery({ orderId });
	const [updateDelivered, { isLoading: loadingUpdate }] =
		useUpdateOrderToDeliveredMutation();

	const itemsPrice = order?.getOrderById.orderItems.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0
	);

	useEffect(() => {
		const getClientId = async () => {
			try {
				setPaymentLoading(true);
				const { data } = await axios.get('/api/clientId');
				setClientId(data);
			} catch (e) {
				console.log(e);
			} finally {
				setPaymentLoading(false);
			}
		};

		if (order?.getOrderById.paymentMethod === 'PayPal' && !isAdmin) {
			getClientId();
		}
	}, [order?.getOrderById.paymentMethod]);

	useEffect(() => {
		const getClientSecret = async () => {
			try {
				setPaymentLoading(true);
				const clientSecret = await stripePayment(
					order!.getOrderById.totalPrice
				);
				setClientSecret(clientSecret);
			} catch (e) {
				console.log(e);
			} finally {
				setPaymentLoading(false);
			}
		};

		if (order?.getOrderById.paymentMethod === 'Stripe' && !isAdmin) {
			getClientSecret();
		}
	}, [order?.getOrderById.paymentMethod]);

	const updateHandler = async () => {
		const id = toast.loading('Updating...', { theme: 'light' });
		try {
			await updateDelivered({ orderId }).unwrap();
			toast.update(id, {
				render: 'Update Success',
				type: 'success',
				isLoading: false,
				autoClose: 3000,
				theme: 'light',
			});
		} catch (e) {
			toast.update(id, {
				render: 'Update Fail',
				type: 'error',
				isLoading: false,
				autoClose: 3000,
				theme: 'light',
			});
			console.log(e);
		}
	};

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

				{!order!.getOrderById.isPaid &&
					!isAdmin &&
					(paymentLoading ? (
						<div>loading...</div>
					) : (
						<div>
							{clientId && (
								<PayPalScriptProvider options={{ 'client-id': clientId }}>
									<PayPalButton order={order!.getOrderById} />
								</PayPalScriptProvider>
							)}
							{clientSecret && (
								<Elements stripe={stripePromise}>
									<StripeForm
										clientSecret={clientSecret}
										orderId={order!.getOrderById.id}
									/>
								</Elements>
							)}
						</div>
					))}

				{loadingUpdate ? (
					<div>Loading</div>
				) : (
					isAdmin &&
					order!.getOrderById.isPaid &&
					!order!.getOrderById.isDelivered && (
						<MainButton onClick={updateHandler}>Mark as delivered</MainButton>
					)
				)}
			</SummaryContainer>
		</FlexContainer>
	);
};

export default Order;
