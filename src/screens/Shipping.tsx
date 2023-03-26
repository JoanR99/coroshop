import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { shippingAddressSchema } from '../validation/shippingAddressSchema';
import {
	selectShippingAddress,
	setShippingAddress,
} from '../features/cart/cartSlice';
import { ShippingAddress } from '../features/cart/cartTypes';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { Container, StyledContainer } from '../components/Container';
import { Heading3 } from '../components/Typography';
import { useAppDispatch, useAppSelector } from '../app/hooks';

const Shipping = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const shippingAddress = useAppSelector(selectShippingAddress);
	const methods = useForm({
		resolver: zodResolver(shippingAddressSchema),
		defaultValues: shippingAddress,
	});

	const submitHandler = (shippingInfo: ShippingAddress) => {
		dispatch(setShippingAddress(shippingInfo));
		navigate('/payment');
	};
	return (
		<Container css={{ mt: '4rem', display: 'flex', justifyContent: 'center' }}>
			<StyledContainer css={{ width: '100%', '@lg': { width: '60%' } }}>
				<Heading3
					size={{
						'@initial': '2',
						'@md': '3',
					}}
					css={{ mb: '2rem' }}
				>
					Shipping Information
				</Heading3>
				<FormProvider {...methods}>
					<form
						onSubmit={methods.handleSubmit(submitHandler)}
						noValidate
						autoComplete="off"
					>
						<FormInput
							type="text"
							name="address"
							id="address"
							label="Address"
							required
						/>
						<FormInput
							type="text"
							name="city"
							id="city"
							label="City"
							required
						/>
						<FormInput
							type="text"
							name="postalCode"
							id="postalCode"
							label="Postal Code"
							required
						/>
						<FormInput
							type="text"
							name="country"
							id="country"
							label="Country"
							required
						/>

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
	);
};

export default Shipping;
