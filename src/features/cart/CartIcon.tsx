import { selectCartCount, toggleIsCartOpen } from './cartSlice';
import BagIcon from '../../components/BagIcon';
import { useAppSelector } from '../../app/hooks';
import { styled } from '../../../stitches.config';

const CartIconContainer = styled('button', {
	border: 'none',
	backgroundColor: 'inherit',
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

	return (
		<>
			<BagIcon />
			<ItemCount>{cartCount}</ItemCount>
		</>
	);
};

export default CartIcon;
