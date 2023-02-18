import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../app/hooks';
import Button from '../../components/Button';
import { Container } from '../../components/Container';
import { Heading3, Heading4 } from '../../components/Typography';
import {
	selectCartCount,
	selectCartItems,
} from '../../features/cart/cartSlice';
import DetailedCartItem from '../../features/cart/DetailedCartItem';
import {
	CartContainer,
	CartItemsContainer,
	CartSubTotalContainer,
	CheckoutHeader,
	HeaderBlock,
	Heading,
	ItemsHeading,
	PriceParagraph,
	SubTotalHeading,
} from './CartStyles';

const Cart = () => {
	const cartItems = useAppSelector(selectCartItems);
	const itemsCount = useAppSelector(selectCartCount);
	const navigate = useNavigate();

	const handleClick = () => navigate('/shipping');

	return (
		<Container>
			<Heading>Shopping Cart</Heading>
			{cartItems.length < 1 ? (
				<Heading3>Your cart is empty</Heading3>
			) : (
				<CartContainer>
					<CartItemsContainer>
						<CheckoutHeader>
							<HeaderBlock>
								<Heading4>Product</Heading4>
							</HeaderBlock>
							<HeaderBlock>
								<Heading4>Price</Heading4>
							</HeaderBlock>
							<HeaderBlock>
								<Heading4>Quantity</Heading4>
							</HeaderBlock>
							<HeaderBlock>
								<Heading4>Remove</Heading4>
							</HeaderBlock>
						</CheckoutHeader>
						{cartItems.map((cartItem) => (
							<DetailedCartItem key={cartItem.id} cartItem={cartItem} />
						))}
					</CartItemsContainer>
					<CartSubTotalContainer>
						<SubTotalHeading>Subtotal</SubTotalHeading>
						<ItemsHeading>{itemsCount} items</ItemsHeading>
						<PriceParagraph>
							$
							{cartItems
								.reduce((acc, item) => acc + item.quantity * item.price, 0)
								.toFixed(2)}
						</PriceParagraph>

						<Button variant="main" onClick={handleClick}>
							PROCEED TO CHECKOUT
						</Button>
					</CartSubTotalContainer>
				</CartContainer>
			)}
		</Container>
	);
};

export default Cart;
