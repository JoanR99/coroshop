import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { MainButton } from '../components/Button';
import { Container } from '../components/Container';
import { Heading2, Heading3, Paragraph } from '../components/Typography';
import {
	selectCartItems,
	selectPaymentMethod,
	selectShippingAddress,
} from '../features/cart/cartSlice';
import { useAddOrderMutation } from '../features/order/orderApiSlice';
import OrderItems from '../features/order/OrderItems';

const PlaceOrderContainer = styled(Container)`
	margin-top: 4rem;
	margin-bottom: 4rem;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
`;

const ContainerHeading = styled(Heading2)`
	margin-bottom: 1.5rem;
`;

const InfoContainer = styled.div`
	width: 63%;
	border-top: solid 1rem #a8dadc;
	border-radius: 1rem;
	padding: 2rem;
	box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.2);
`;

const SummaryContainer = styled.div`
	width: 33%;
	border-top: solid 1rem #a8dadc;
	border-radius: 1rem;
	padding: 2rem;
	box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.2);
`;

const Section = styled.div`
	&:not(:last-child) {
		border-bottom: 1px solid #a8dadc;
		margin-bottom: 2rem;
		padding-bottom: 2rem;
	}
`;

const SectionHeading = styled(Heading3)`
	margin-bottom: 1rem;
`;

const PlaceOrder = () => {
	const [addOrder] = useAddOrderMutation();
	const shippingAddress = selectShippingAddress();
	const paymentMethod = selectPaymentMethod();
	const cartItems = selectCartItems();
	const navigate = useNavigate();

	const addDecimals = (num: number) =>
		Number((Math.round(num * 100) / 100).toFixed(2));

	const itemsPrice = cartItems.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0
	);

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
		<PlaceOrderContainer>
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
						<OrderItems key={cartItem.id} cartItem={cartItem} />
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

				<MainButton onClick={clickHandler} disabled={cartItems.length === 0}>
					Place Order
				</MainButton>
			</SummaryContainer>
		</PlaceOrderContainer>
	);
};

export default PlaceOrder;
