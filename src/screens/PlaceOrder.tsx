import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Button from '../components/Button';
import { Container, StyledContainer } from '../components/Container';
import { Heading2, Paragraph } from '../components/Typography';
import {
	selectCartItems,
	selectCartTotalPrice,
	selectPaymentMethod,
	selectShippingAddress,
} from '../features/cart/cartSlice';
import { FlexSection } from '../components/Section';
import { useAddOrderMutation } from '../features/order/orderApiSlice';
import OrderItems from '../features/order/OrderItems';
import { useAppSelector } from '../app/hooks';

const PlaceOrder = () => {
	const [addOrder, { isLoading }] = useAddOrderMutation();
	const shippingAddress = useAppSelector(selectShippingAddress);
	const paymentMethod = useAppSelector(selectPaymentMethod);
	const cartItems = useAppSelector(selectCartItems);
	const itemsPrice = useAppSelector(selectCartTotalPrice);
	const navigate = useNavigate();

	const addDecimals = (num: number) =>
		Number((Math.round(num * 100) / 100).toFixed(2));

	const orderItems = cartItems.map((cartItem) => ({
		productName: cartItem.name,
		quantity: cartItem.quantity,
		image: cartItem.image,
		price: cartItem.price,
		product: cartItem.id,
	}));
	const shippingPrice = itemsPrice > 100 ? 0 : 20;
	const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));
	const totalPrice = Number(
		(Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2)
	);

	const clickHandler = async () => {
		const id = toast.loading('Adding product...', { theme: 'light' });
		try {
			const order = await addOrder({
				itemsPrice,
				orderItems,
				paymentMethod,
				shippingAddress,
				shippingPrice,
				taxPrice,
				totalPrice,
			}).unwrap();

			toast.update(id, {
				render: 'Add order Success',
				type: 'success',
				isLoading: false,
				hideProgressBar: true,
				autoClose: 1000,
				theme: 'light',
			});
			navigate(`/order/${order.addOrder.id}`);
		} catch (e) {
			toast.update(id, {
				render: 'Add order Fail',
				type: 'error',
				isLoading: false,
				hideProgressBar: true,
				autoClose: 1000,
				theme: 'light',
			});
		}
	};

	return (
		<Container>
			<StyledContainer size="main">
				<Heading2>Order Information</Heading2>
				<FlexSection>
					<Heading2>Shipping</Heading2>
					<Paragraph>
						<strong>Address: </strong>
						{shippingAddress.address}, {shippingAddress.city}{' '}
						{shippingAddress.postalCode}, {shippingAddress.country}
					</Paragraph>
				</FlexSection>

				<FlexSection>
					<Heading2>Payment Method</Heading2>
					<Paragraph>
						<strong>Method: </strong>
						{paymentMethod}
					</Paragraph>
				</FlexSection>

				<FlexSection>
					<Heading2>Order Items</Heading2>
					{cartItems.map((cartItem) => (
						<OrderItems key={cartItem.id} item={cartItem} />
					))}
				</FlexSection>
			</StyledContainer>

			<StyledContainer size="secondary">
				<Heading2>Order Summary</Heading2>
				<FlexSection>
					<Heading2>Items</Heading2>
					<Paragraph>${itemsPrice}</Paragraph>
				</FlexSection>
				<FlexSection>
					<Heading2>Shipping</Heading2>
					<Paragraph>${shippingPrice}</Paragraph>
				</FlexSection>

				<FlexSection>
					<Heading2>Tax</Heading2>
					<Paragraph>${taxPrice}</Paragraph>
				</FlexSection>

				<FlexSection>
					<Heading2>Total</Heading2>
					<Paragraph>${totalPrice}</Paragraph>
				</FlexSection>

				<Button
					variant="main"
					onClick={clickHandler}
					disabled={cartItems.length === 0 || isLoading}
				>
					Place Order
				</Button>
			</StyledContainer>
		</Container>
	);
};

export default PlaceOrder;
