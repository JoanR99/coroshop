import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Button from '../components/Button';
import { Container, StyledContainer } from '../components/Container';
import {
	Heading2,
	Heading3,
	Heading4,
	Paragraph,
} from '../components/Typography';
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
		<Container
			css={{
				my: '4rem',
				display: 'flex',
				flexDirection: 'column',
				gap: '4rem',
				'@lg': { flexDirection: 'row', alignItems: 'self-start' },
			}}
		>
			<StyledContainer css={{ width: '100%', '@lg': { width: '66%' } }}>
				<Heading3
					size={{
						'@initial': '2',
						'@md': '3',
					}}
					css={{ mb: '2rem' }}
				>
					Order Information
				</Heading3>
				<FlexSection direction="column" css={{ mb: '1rem' }}>
					<Heading4
						size={{
							'@initial': '1',
							'@md': '2',
						}}
					>
						Shipping
					</Heading4>
					<Paragraph
						fontSize={{
							'@initial': '2',
							'@md': '3',
						}}
					>
						<strong>Address: </strong>
						{shippingAddress.address}, {shippingAddress.city}{' '}
						{shippingAddress.postalCode}, {shippingAddress.country}
					</Paragraph>
				</FlexSection>

				<FlexSection direction="column" css={{ mb: '1rem' }}>
					<Heading4
						size={{
							'@initial': '1',
							'@md': '2',
						}}
					>
						Payment Method
					</Heading4>
					<Paragraph
						fontSize={{
							'@initial': '2',
							'@md': '3',
						}}
					>
						<strong>Method: </strong>
						{paymentMethod}
					</Paragraph>
				</FlexSection>

				<FlexSection direction="column" css={{ mb: '1rem' }}>
					<Heading4
						size={{
							'@initial': '1',
							'@md': '2',
						}}
					>
						Order Items
					</Heading4>
					{cartItems.map((cartItem) => (
						<OrderItems key={cartItem.id} item={cartItem} />
					))}
				</FlexSection>
			</StyledContainer>

			<StyledContainer css={{ width: '100%', '@lg': { width: '33%' } }}>
				<Heading3
					size={{
						'@initial': '2',
						'@md': '3',
					}}
					css={{ mb: '2rem' }}
				>
					Order Summary
				</Heading3>
				<FlexSection direction="column" css={{ mb: '1rem' }}>
					<Heading4
						size={{
							'@initial': '1',
							'@md': '2',
						}}
					>
						Items
					</Heading4>
					<Paragraph
						fontSize={{
							'@initial': '2',
							'@md': '3',
						}}
					>
						${itemsPrice}
					</Paragraph>
				</FlexSection>
				<FlexSection direction="column" css={{ mb: '1rem' }}>
					<Heading4
						size={{
							'@initial': '1',
							'@md': '2',
						}}
					>
						Shipping
					</Heading4>
					<Paragraph
						fontSize={{
							'@initial': '2',
							'@md': '3',
						}}
					>
						${shippingPrice}
					</Paragraph>
				</FlexSection>

				<FlexSection direction="column" css={{ mb: '1rem' }}>
					<Heading4
						size={{
							'@initial': '1',
							'@md': '2',
						}}
					>
						Tax
					</Heading4>
					<Paragraph
						fontSize={{
							'@initial': '2',
							'@md': '3',
						}}
					>
						${taxPrice}
					</Paragraph>
				</FlexSection>

				<FlexSection direction="column" css={{ mb: '1rem' }}>
					<Heading4
						size={{
							'@initial': '1',
							'@md': '2',
						}}
					>
						Total
					</Heading4>
					<Paragraph
						fontSize={{
							'@initial': '2',
							'@md': '3',
						}}
					>
						${totalPrice}
					</Paragraph>
				</FlexSection>

				<Button
					variant="main"
					onClick={clickHandler}
					disabled={cartItems.length === 0 || isLoading}
					size={{
						'@initial': 'small',
						'@md': 'normal',
					}}
					fontSize="1"
				>
					Place Order
				</Button>
			</StyledContainer>
		</Container>
	);
};

export default PlaceOrder;
