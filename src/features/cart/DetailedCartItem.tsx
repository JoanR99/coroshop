import React from 'react';
import styled from 'styled-components';

import Button from '../../components/Button';
import { StyledLink4 } from '../../components/StyledLink';
import { Paragraph } from '../../components/Typography';
import { removeCartItem, updateCartItemQuantity } from './cartSlice';
import { CartItem } from './cartTypes';
import { ItemContainer, ItemImage } from '../../components/ItemContainer';
import { useAppDispatch } from '../../app/hooks';

type Props = {
	cartItem: CartItem;
};

const CartColum = styled.div`
	display: flex;
	align-items: center;
	column-gap: 1rem;
	width: 23%;
	&:last-child {
		width: 8%;
	}
`;

const DetailedCartItem = ({ cartItem }: Props) => {
	const { name, image, price, quantity, id } = cartItem;
	const dispatch = useAppDispatch();

	const handleQuantityChange = (e: React.FormEvent<HTMLInputElement>) => {
		if (Number(e!.currentTarget!.value) > cartItem.countInStock) {
			dispatch(
				updateCartItemQuantity({
					id,
					quantity: cartItem.countInStock,
				})
			);
		} else {
			dispatch(
				updateCartItemQuantity({
					id,
					quantity: Number(e!.currentTarget!.value),
				})
			);
		}
	};

	const handleRemove = () => dispatch(removeCartItem({ id }));

	return (
		<ItemContainer>
			<CartColum>
				<ItemImage src={image} alt={name} />
				<StyledLink4 to={`/products/${id}`} theme="dark">
					{name}
				</StyledLink4>
			</CartColum>

			<CartColum>
				<Paragraph>${price}</Paragraph>
			</CartColum>

			<CartColum>
				<input
					type="number"
					id="quantity"
					min="1"
					max={cartItem.countInStock}
					value={quantity}
					onChange={handleQuantityChange}
				/>
			</CartColum>

			<CartColum>
				<Button variant="ghost" onClick={handleRemove}>
					&#10005;
				</Button>
			</CartColum>
		</ItemContainer>
	);
};

export default DetailedCartItem;
