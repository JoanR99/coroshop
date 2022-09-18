import { useDispatch } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	selectShippingAddress,
	setPaymentMethod,
} from '../features/cart/cartSlice';
import FormInput from '../components/FormInput';
import { MainButton } from '../components/Button';
import styled from 'styled-components';
import { Container } from '../components/Container';
import { Heading3 } from '../components/Typography';
import {
	paymentMethodSchema,
	defaultValues,
} from '../validation/paymentMethodSchema';

const StyledContainer = styled(Container)`
	max-width: 60rem;
	margin: auto;
	margin-top: 4rem;
	margin-bottom: 4rem;
	border-top: solid 1rem #a8dadc;
	border-radius: 1rem;
	padding: 2rem;
	box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.2);
`;

const Payment = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const shippingAddress = selectShippingAddress();
	const methods = useForm({
		resolver: zodResolver(paymentMethodSchema),
		defaultValues,
	});

	const submitHandler = ({ paymentMethod }: { paymentMethod: string }) => {
		dispatch(setPaymentMethod(paymentMethod));
		navigate('/placeOrder');
	};
	return shippingAddress ? (
		<StyledContainer>
			<Heading3>Payment Method</Heading3>
			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit(submitHandler)}
					noValidate
					autoComplete="off"
				>
					<FormInput
						type="radio"
						name="paymentMethod"
						id="PayPal"
						label="PayPal or Credit Card"
						value="PayPal"
						checked
						required
					/>
					<FormInput
						type="radio"
						name="paymentMethod"
						id="Stripe"
						label="Stripe"
						value="Stripe"
						required
					/>

					<MainButton>GO TO PAYMENT</MainButton>
				</form>
			</FormProvider>
		</StyledContainer>
	) : (
		<Navigate to="shipping" />
	);
};

export default Payment;
