import styled from 'styled-components';
import { StyledLinkDark4 } from '../../components/StyledLink';
import { Paragraph } from '../../components/Typography';
import { CartItem } from '../cart/cartTypes';
import { OrderItem } from './orderTypes';
import { ItemContainer, ItemImage } from '../../components/ItemContainer';

type Props = {
	item: CartItem | OrderItem;
};

const ItemColum = styled.div`
	display: flex;
	align-items: center;
	column-gap: 1rem;
	width: 50%;
`;

const PriceColumn = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 25%;
`;

const OrderItems = ({ item }: Props) => {
	const { image, quantity, price } = item;

	const id = 'id' in item ? item.id : item.product;

	const name = 'name' in item ? item.name : item.productName;

	return (
		<ItemContainer>
			<ItemColum>
				<ItemImage src={image} alt={name} />
				<StyledLinkDark4 to={`/products/${id}`}>{name}</StyledLinkDark4>
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
