import StyledLink from '../../components/StyledLink';
import { Paragraph } from '../../components/Typography';
import { CartItem } from '../cart/cartTypes';
import { OrderItem } from './orderTypes';
import { ItemContainer, ItemImage } from '../../components/ItemContainer';
import { styled } from '../../../stitches.config';

type Props = {
	item: CartItem | OrderItem;
};

const ItemColum = styled('div', {
	display: 'flex',
	alignItems: 'center',
	columnGap: '1rem',
	width: '50%',
});

const PriceColumn = styled('div', {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '25%',
});

const OrderItems = ({ item }: Props) => {
	const { image, quantity, price } = item;

	const id = 'id' in item ? item.id : item.product;

	const name = 'name' in item ? item.name : item.productName;

	return (
		<ItemContainer>
			<ItemColum>
				<ItemImage src={image} alt={name} />
				<StyledLink
					to={`/products/${id}`}
					theme="dark"
					size={{
						'@initial': 5,
						'@sm': 4,
					}}
				>
					{name}
				</StyledLink>
			</ItemColum>

			<PriceColumn>
				<Paragraph>
					{quantity} x ${price} = ${quantity * price}
				</Paragraph>
			</PriceColumn>
		</ItemContainer>
	);
};

export default OrderItems;
