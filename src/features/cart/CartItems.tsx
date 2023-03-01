import * as ScrollArea from '@radix-ui/react-scroll-area';

import { styled } from '../../../stitches.config';
import { useAppSelector } from '../../app/hooks';
import { selectCartItems } from './cartSlice';
import ItemOnCart from './ItemOnCart';

const CartItemsContainer = styled(ScrollArea.Root, {
	height: '35rem',
	display: 'flex',
	flexDirection: 'column',
	overflow: 'hidden',
	'--scrollbar-size': '10px',
	mb: '1rem',
});

const ItemsContainer = styled(ScrollArea.Viewport, {
	width: '100%',
	height: '100%',
	borderRadius: 'inherit',
});

const Scrollbar = styled(ScrollArea.Scrollbar, {
	display: 'flex',
	userSelect: 'none',
	touchAction: 'none',
	padding: '2px',
	transition: 'background 160ms ease-out',
	backgroundColor: 'LightGray',
	width: '10px',
});

const Corner = styled(ScrollArea.Corner, {
	backgroundColor: 'LightGray',
});

const Thumb = styled(ScrollArea.Thumb, {
	flex: 1,
	background: 'DarkGray',
	borderRadius: '50px',
	position: 'relative',

	'&::before': {
		content: '',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '100%',
		height: '100%',
		minWidth: '44px',
		minHeight: '44px',
	},
});

const CartItems = () => {
	const cartItems = useAppSelector(selectCartItems);

	return (
		<CartItemsContainer>
			<ItemsContainer>
				{cartItems.map((cartItem) => (
					<ItemOnCart key={cartItem.id} cartItem={cartItem} />
				))}
			</ItemsContainer>
			<Scrollbar orientation="vertical">
				<Thumb />
			</Scrollbar>
			<Corner />
		</CartItemsContainer>
	);
};

export default CartItems;
