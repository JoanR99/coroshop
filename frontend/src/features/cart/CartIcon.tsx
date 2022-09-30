import styled from 'styled-components';
import { selectCartCount, toggleIsCartOpen } from './cartSlice';

import BagIcon from '../../components/BagIcon';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const CartIconContainer = styled.div`
	width: 30px;
	height: 30px;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
`;

const ItemCount = styled.span`
	position: absolute;
	font-size: 10px;
	font-weight: bold;
	bottom: 4px;
	color: #f1faee;
`;

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
