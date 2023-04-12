import React from 'react';

import Button from '../../components/Button';
import StyledLink from '../../components/StyledLink';
import { Paragraph } from '../../components/Typography';
import { removeCartItem, updateCartItemQuantity } from './cartSlice';
import { CartItem } from './cartTypes';
import { ItemImage } from '../../components/ItemImage';
import { useAppDispatch } from '../../app/hooks';
import { styled } from '../../../stitches.config';
import Flex from '../../components/Flex';

type Props = {
	cartItem: CartItem;
};

const Td = styled('td', {
	width: '20%',
	textAlign: 'left',
	verticalAlign: 'middle',
});

const Tr = styled('tr', {});

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
		<Tr>
			<Td css={{ width: '40%' }}>
				<Flex align="center">
					<ItemImage src={image} alt={name} css={{ mr: '1rem' }} />
					<StyledLink
						to={`/products/${id}`}
						theme="dark"
						fontSize={{
							'@initial': 1,
							'@sm': 2,
						}}
						css={{ lineHeight: '1' }}
					>
						{name}
					</StyledLink>
				</Flex>
			</Td>

			<Td>
				<Paragraph
					fontSize={{
						'@initial': '2',
						'@md': '3',
					}}
				>
					${price}
				</Paragraph>
			</Td>

			<Td>
				<input
					type="number"
					id="quantity"
					min="1"
					max={cartItem.countInStock}
					value={quantity}
					onChange={handleQuantityChange}
				/>
			</Td>

			<Td>
				<Button
					variant="ghost"
					size="small"
					fontSize="1"
					css={{ border: 'none' }}
					onClick={handleRemove}
				>
					&#10005;
				</Button>
			</Td>
		</Tr>
	);
};

export default DetailedCartItem;
