import { selectIsCartOpen } from './cartSlice';
import CartIcon from './CartIcon';
import CartDropDown from './CartDropDown';
import { useAppSelector } from '../../app/hooks';

const CartNavbar = () => {
	const isCartOpen = useAppSelector(selectIsCartOpen);

	return (
		<div>
			<CartIcon />
			{isCartOpen && <CartDropDown />}
		</div>
	);
};

export default CartNavbar;
