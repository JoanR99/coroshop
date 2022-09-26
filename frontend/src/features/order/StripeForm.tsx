import { useElements, useStripe } from '@stripe/react-stripe-js';
import { CardElement } from '@stripe/react-stripe-js';
import { MainButton } from '../../components/Button';
import styled from 'styled-components';
import { Heading3 } from '../../components/Typography';
import { FormEvent, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useUpdateOrderToPaidMutation } from './orderApiSlice';

type Props = {
	clientSecret: string;
	orderId: string;
};

const PaymentFormContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const FormContainer = styled.form`
	width: 100%;
`;

const StyledCard = styled(CardElement)`
	margin-top: 2rem;
	margin-bottom: 2rem;
`;

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
			toast.error(paymentResult.error.message);
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
			toast.success('Payment Success');
		}

		setIsLoading(false);
	};

	return (
		<PaymentFormContainer>
			<FormContainer onSubmit={paymentHandler}>
				<Heading3>Credit card payment:</Heading3>
				<StyledCard />
				<MainButton disabled={isLoading || !stripe || !elements}>
					Pay Now
				</MainButton>
			</FormContainer>
		</PaymentFormContainer>
	);
};

export default StripeForm;
