import { Heading4, Paragraph } from '../../components/Typography';
import { CartItem } from './cartTypes';
import { styled } from '../../../stitches.config';

type Props = {
	cartItem: CartItem;
};

const CartItemContainer = styled('div', {
	width: '100%',
	display: 'flex',

	variants: {
		height: {
			small: {
				height: '6rem',
			},
			normal: {
				height: '8rem',
			},
		},
	},
});

const ItemImage = styled('img', {
	width: '40%',
});

const ItemDetails = styled('div', {
	width: '70%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-start',
	justifyContent: 'center',
	padding: '1rem 2rem',
});

const ItemOnCart = ({ cartItem }: Props) => {
	const { name, image, price, quantity } = cartItem;

	return (
		<CartItemContainer
			height={{
				'@initial': 'small',
				'@md': 'normal',
			}}
			css={{ mb: '1rem', '@md': { mb: '1.5rem' } }}
		>
			<ItemImage src={image} alt={name} />
			<ItemDetails>
				<Heading4
					size={{
						'@initial': '1',
						'@md': '2',
					}}
				>
					{name}
				</Heading4>
				<Paragraph>
					{quantity} x ${price}
				</Paragraph>
			</ItemDetails>
		</CartItemContainer>
	);
};

export default ItemOnCart;
