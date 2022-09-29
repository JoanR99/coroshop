import { selectIsCartOpen } from './cartSlice';
import CartIcon from './CartIcon';
import CartDropDown from './CartDropDown';

const CartNavbar = () => {
	const isCartOpen = selectIsCartOpen();

	return (
		<div>
			<CartIcon />
			{isCartOpen && <CartDropDown />}
		</div>
	);
};

export default CartNavbar;
