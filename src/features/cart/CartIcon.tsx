import { selectCartCount, toggleIsCartOpen } from './cartSlice';
import BagIcon from '../../components/BagIcon';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { styled } from '../../../stitches.config';

const CartIconContainer = styled('div', {
	width: '30px',
	height: '30px',
	position: 'relative',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	cursor: 'pointer',
});

const ItemCount = styled('span', {
	position: 'absolute',
	fontSize: '10px',
	fontWeight: 'bold',
	bottom: '4px',
	color: '$light',
});

const CartIcon = () => {
	const cartCount = useAppSelector(selectCartCount);
	const dispatch = useAppDispatch();

	const toggleCartOpen = () => dispatch(toggleIsCartOpen());

	return (
		<CartIconContainer onClick={toggleCartOpen}>
			<BagIcon />
			<ItemCount>{cartCount}</ItemCount>
		</CartIconContainer>
	);
};

export default CartIcon;
