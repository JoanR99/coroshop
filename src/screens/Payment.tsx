import { useNavigate, Navigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
	selectShippingAddress,
	setPaymentMethod,
} from '../features/cart/cartSlice';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { Heading3 } from '../components/Typography';
import { Container, StyledContainer } from '../components/Container';
import {
	paymentMethodSchema,
	defaultValues,
} from '../validation/paymentMethodSchema';
import { PaymentMethod } from '../features/cart/cartTypes';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import RadioGroup from '../components/RadioGroup';
import RadioInput from '../components/RadioInput';

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
		<Container css={{ mt: '4rem', display: 'flex', justifyContent: 'center' }}>
			<StyledContainer css={{ width: '100%', '@lg': { width: '40%' } }}>
				<Heading3
					size={{
						'@initial': '2',
						'@md': '3',
					}}
					css={{ mb: '2rem' }}
				>
					Payment Method
				</Heading3>
				<FormProvider {...methods}>
					<form
						onSubmit={methods.handleSubmit(submitHandler)}
						noValidate
						autoComplete="off"
					>
						<RadioGroup
							defaultValue="PayPal"
							label="Payment Method"
							name="paymentMethod"
							required
						>
							<RadioInput
								id="PayPal"
								label="PayPal or Credit Card"
								value="PayPal"
							/>

							<RadioInput id="Stripe" label="Stripe" value="Stripe" />
						</RadioGroup>

						<Button
							variant="main"
							size={{
								'@initial': 'small',
								'@md': 'normal',
							}}
							fontSize="1"
						>
							GO TO PAYMENT
						</Button>
					</form>
				</FormProvider>
			</StyledContainer>
		</Container>
	) : (
		<Navigate to="shipping" />
	);
};

export default Payment;
