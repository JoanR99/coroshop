import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { MainButton } from '../components/Button';
import {
	FlexContainer,
	InfoContainer,
	SummaryContainer,
	ContainerHeading,
} from '../components/Container';
import { Paragraph } from '../components/Typography';
import {
	selectCartItems,
	selectCartTotalPrice,
	selectPaymentMethod,
	selectShippingAddress,
} from '../features/cart/cartSlice';
import { Section, SectionHeading } from '../components/Section';
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
				autoClose: 3000,
				theme: 'light',
			});
			navigate(`/order/${order.addOrder.id}`);
		} catch (e) {
			toast.update(id, {
				render: 'Add order Fail',
				type: 'error',
				isLoading: false,
				autoClose: 3000,
				theme: 'light',
			});
			console.log(e);
		}
	};

	return (
		<FlexContainer>
			<InfoContainer>
				<ContainerHeading>Order Information</ContainerHeading>
				<Section>
					<SectionHeading>Shipping</SectionHeading>
					<Paragraph>
						<strong>Address: </strong>
						{shippingAddress.address}, {shippingAddress.city}{' '}
						{shippingAddress.postalCode}, {shippingAddress.country}
					</Paragraph>
				</Section>

				<Section>
					<SectionHeading>Payment Method</SectionHeading>
					<Paragraph>
						<strong>Method: </strong>
						{paymentMethod}
					</Paragraph>
				</Section>

				<Section>
					<SectionHeading>Order Items</SectionHeading>
					{cartItems.map((cartItem) => (
						<OrderItems key={cartItem.id} item={cartItem} />
					))}
				</Section>
			</InfoContainer>

			<SummaryContainer>
				<ContainerHeading>Order Summary</ContainerHeading>
				<Section>
					<SectionHeading>Items</SectionHeading>
					<Paragraph>${itemsPrice}</Paragraph>
				</Section>
				<Section>
					<SectionHeading>Shipping</SectionHeading>
					<Paragraph>${shippingPrice}</Paragraph>
				</Section>

				<Section>
					<SectionHeading>Tax</SectionHeading>
					<Paragraph>${taxPrice}</Paragraph>
				</Section>

				<Section>
					<SectionHeading>Total</SectionHeading>
					<Paragraph>${totalPrice}</Paragraph>
				</Section>

				<MainButton
					onClick={clickHandler}
					disabled={cartItems.length === 0 || isLoading}
				>
					Place Order
				</MainButton>
			</SummaryContainer>
		</FlexContainer>
	);
};

export default PlaceOrder;
