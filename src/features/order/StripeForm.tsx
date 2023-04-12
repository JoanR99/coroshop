import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { useElements, useStripe } from '@stripe/react-stripe-js';
import { CardElement } from '@stripe/react-stripe-js';

import Button from '../../components/Button';
import { Heading3 } from '../../components/Typography';
import { useUpdateOrderToPaidMutation } from './orderApiSlice';
import { styled } from '../../../stitches.config';

type Props = {
	clientSecret: string;
	orderId: string;
};

const PaymentFormContainer = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
});

const FormContainer = styled('form', {
	width: '100%',
});

const StyledCard = styled(CardElement, {
	my: '2rem',
});

const StripeForm = ({ clientSecret, orderId }: Props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [updateIsPaid] = useUpdateOrderToPaidMutation();
	const stripe = useStripe();
	const elements = useElements();

	const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		setIsLoading(true);

		const paymentResult = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: elements.getElement(CardElement)!,
				billing_details: {
					name: 'Jenny Rosen',
				},
			},
		});

		if (paymentResult.error) {
			toast.error(paymentResult.error.message, {
				hideProgressBar: true,
				autoClose: 1000,
			});
		} else {
			const paymentResultBody = {
				id: paymentResult.paymentIntent.id,
				status: paymentResult.paymentIntent.status,
				update_time: Date.now().toString(),
				email_address: paymentResult.paymentIntent.receipt_email || '',
			};

			await updateIsPaid({
				orderId,
				paymentResultBody,
			}).unwrap();
			toast.success('Payment Success', {
				hideProgressBar: true,
				autoClose: 1000,
			});
		}

		setIsLoading(false);
	};

	return (
		<PaymentFormContainer>
			<FormContainer onSubmit={paymentHandler}>
				<Heading3>Credit card payment:</Heading3>
				<StyledCard />
				<Button
					variant="main"
					size={{
						'@initial': 'small',
						'@md': 'normal',
					}}
					fontSize="1"
					disabled={isLoading || !stripe || !elements}
				>
					Pay Now
				</Button>
			</FormContainer>
		</PaymentFormContainer>
	);
};

export default StripeForm;
