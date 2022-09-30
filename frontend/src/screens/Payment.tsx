import { useNavigate, Navigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	selectShippingAddress,
	setPaymentMethod,
} from '../features/cart/cartSlice';
import FormInput from '../components/FormInput';
import { MainButton } from '../components/Button';
import { MarginContainer } from '../components/Container';
import { Heading3 } from '../components/Typography';
import {
	paymentMethodSchema,
	defaultValues,
} from '../validation/paymentMethodSchema';
import { PaymentMethod } from '../features/cart/cartTypes';
import { useAppDispatch, useAppSelector } from '../app/hooks';

const Payment = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const shippingAddress = useAppSelector(selectShippingAddress);
	const methods = useForm({
		resolver: zodResolver(paymentMethodSchema),
		defaultValues,
	});

	const submitHandler = ({ paymentMethod }: { paymentMethod: string }) => {
		dispatch(setPaymentMethod(paymentMethod as PaymentMethod));
		navigate('/placeOrder');
	};
	return shippingAddress ? (
		<MarginContainer>
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
		</MarginContainer>
	) : (
		<Navigate to="shipping" />
	);
};

export default Payment;
