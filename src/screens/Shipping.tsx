import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import styled from 'styled-components';

import { shippingAddressSchema } from '../validation/shippingAddressSchema';
import {
	selectShippingAddress,
	setShippingAddress,
} from '../features/cart/cartSlice';
import { ShippingAddress } from '../features/cart/cartTypes';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { Container } from '../components/Container';
import { Heading3 } from '../components/Typography';
import { useAppDispatch, useAppSelector } from '../app/hooks';

const Input = styled(FormInput)`
	width: 100%;
`;

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
		<Container space="bottom">
			<Heading3>Shipping Information</Heading3>
			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit(submitHandler)}
					noValidate
					autoComplete="off"
				>
					<Input
						type="text"
						name="address"
						id="address"
						label="Address"
						required
					/>
					<Input type="text" name="city" id="city" label="City" required />
					<Input
						type="text"
						name="postalCode"
						id="postalCode"
						label="Postal Code"
						required
					/>
					<Input
						type="text"
						name="country"
						id="country"
						label="Country"
						required
					/>

					<Button variant="main">GO TO PAYMENT</Button>
				</form>
			</FormProvider>
		</Container>
	);
};

export default Shipping;
