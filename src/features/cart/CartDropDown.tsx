import { useNavigate } from 'react-router-dom';

import Button from '../../components/Button';
import ItemOnCart from './ItemOnCart';
import { selectCartItems, toggleIsCartOpen } from './cartSlice';
import { StyledContainer } from '../../components/Container';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { styled } from '../../../stitches.config';

const CartDropdownContainer = styled(StyledContainer, {
	position: 'absolute',
	width: '30rem',
	height: '40rem',
	display: 'flex',
	flexDirection: 'column',
	backgroundColor: '$light',
	top: '90px',
	right: '40px',
	zIndex: 5,
});

const CartItems = styled('div', {
	height: '35rem',
	display: 'flex',
	flexDirection: 'column',
	overflowY: 'scroll',
});

const CartDropDown = () => {
	const cartItems = useAppSelector(selectCartItems);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const clickHandler = () => {
		dispatch(toggleIsCartOpen());
		navigate('/cart');
	};

	return (
		<CartDropdownContainer>
			<CartItems>
				{cartItems.map((cartItem) => (
					<ItemOnCart key={cartItem.id} cartItem={cartItem} />
				))}
			</CartItems>

			<Button variant="main" onClick={clickHandler}>
				GO TO CART
			</Button>
		</CartDropdownContainer>
	);
};

export default CartDropDown;
