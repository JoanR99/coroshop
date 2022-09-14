import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MainButton } from '../../components/Button';
import ItemOnCart from './CartItem';
import { selectCartItems } from './cartSlice';

const CartDropdownContainer = styled.div`
	position: absolute;
	width: 30rem;
	height: 40rem;
	display: flex;
	flex-direction: column;
	background-color: white;
	top: 90px;
	right: 40px;
	z-index: 5;

	border-top: solid 1rem #a8dadc;
	border-radius: 1rem;
	padding: 2rem;
	box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.2);
`;

const CartItems = styled.div`
	height: 35rem;
	display: flex;
	flex-direction: column;
	overflow: scroll;
`;

const CartDropDown = () => {
	const cartItems = selectCartItems();
	const navigate = useNavigate();

	const clickHandler = () => navigate('/cart');

	return (
		<CartDropdownContainer>
			<CartItems>
				{cartItems.map((cartItem) => (
					<ItemOnCart key={cartItem.id} cartItem={cartItem} />
				))}
			</CartItems>

			<MainButton onClick={clickHandler}>GO TO CART</MainButton>
		</CartDropdownContainer>
	);
};

export default CartDropDown;
