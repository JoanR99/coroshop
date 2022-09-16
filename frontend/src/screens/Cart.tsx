import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MainButton } from '../components/Button';
import { Container } from '../components/Container';
import {
	Heading2,
	Heading3,
	Heading4,
	Paragraph,
} from '../components/Typography';
import { selectCartCount, selectCartItems } from '../features/cart/cartSlice';
import DetailedCartItem from '../features/cart/DetailedCartItem';

const Heading = styled(Heading2)`
	margin-bottom: 2rem;
	margin-top: 2rem;
`;

const CartContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
`;

const CartItemsContainer = styled.div`
	width: 78%;
	border-top: solid 1rem #a8dadc;
	border-radius: 1rem;
	padding: 2rem;
	box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.2);
`;

const CartSubTotalContainer = styled.div`
	width: 18%;
	border-top: solid 1rem #a8dadc;
	border-radius: 1rem;
	padding: 2rem;
	box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.2);
`;

const CheckoutHeader = styled.div`
	width: 100%;
	padding-bottom: 1rem;
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid darkgrey;
`;

export const HeaderBlock = styled.div`
	text-transform: capitalize;
	width: 23%;
	&:last-child {
		width: 8%;
	}
`;

const SubTotalHeading = styled(Heading3)`
	margin-bottom: 2rem;
`;

const ItemsHeading = styled(Heading4)`
	margin-bottom: 0.8rem;
`;

const PriceParagraph = styled(Paragraph)`
	margin-bottom: 2rem;
`;

const Cart = () => {
	const cartItems = selectCartItems();
	const itemsCount = selectCartCount();
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

						<MainButton onClick={handleClick}>PROCEED TO CHECKOUT</MainButton>
					</CartSubTotalContainer>
				</CartContainer>
			)}
		</Container>
	);
};

export default Cart;
