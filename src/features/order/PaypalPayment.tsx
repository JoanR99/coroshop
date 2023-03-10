import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useEffect, useState } from 'react';
import Spinner from '../../components/Spinner';
import { Order } from './orderTypes';
import PayPalButton from './PayPalButton';
import getClientIdFromServer from './getClientId';

type Props = {
	order: Order;
};

const PaypalPayment = ({ order }: Props) => {
	const [clientId, setClientId] = useState('');
	const [paymentLoading, setPaymentLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		let isMounted = true;
		const getClientId = async () => {
			try {
				const id = await getClientIdFromServer();

				isMounted && setClientId(id);
			} catch (e) {
				console.log(e);
				isMounted && setError(true);
			} finally {
				isMounted && setPaymentLoading(false);
			}
		};

		getClientId();

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
			{clientId && (
				<PayPalScriptProvider options={{ 'client-id': clientId }}>
					<PayPalButton order={order} />
				</PayPalScriptProvider>
			)}
		</div>
	);
};

export default PaypalPayment;
