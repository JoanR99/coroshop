import { Elements } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { stripePromise } from './stripe';
import { Order } from './orderTypes';
import StripeForm from './StripeForm';
import getClientSecretFromServer from './getClientSecret';
import Spinner from '../../components/Spinner';

type Props = {
	order: Order;
};

const StripePayment = ({ order }: Props) => {
	const [clientSecret, setClientSecret] = useState('');
	const [paymentLoading, setPaymentLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		let isMounted = true;
		const getClientSecret = async () => {
			try {
				const clientSecret = await getClientSecretFromServer(order.totalPrice);
				isMounted && setClientSecret(clientSecret);
			} catch (e) {
				console.log(e);
				isMounted && setError(true);
			} finally {
				isMounted && setPaymentLoading(false);
			}
		};

		getClientSecret();

		return () => {
			isMounted = false;
		};
	}, []);

	return paymentLoading ? (
		<Spinner />
	) : error ? (
		<p>Something went wrong charging payment method.</p>
	) : (
		<div>
			{clientSecret && (
				<Elements stripe={stripePromise}>
					<StripeForm clientSecret={clientSecret} orderId={order.id} />
				</Elements>
			)}
		</div>
	);
};

export default StripePayment;
