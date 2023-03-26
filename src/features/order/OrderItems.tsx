import StyledLink from '../../components/StyledLink';
import { Paragraph } from '../../components/Typography';
import { CartItem } from '../cart/cartTypes';
import { OrderItem } from './orderTypes';
import { ItemImage } from '../../components/ItemImage';
import { styled } from '../../../stitches.config';
import Flex from '../../components/Flex';

type Props = {
	item: CartItem | OrderItem;
};

const Table = styled('table', {
	width: '100%',
	borderSpacing: '1rem',
});

const Tr = styled('tr', {
	textAlign: 'left',
});

const Td = styled('td', {
	textAlign: 'left',
	verticalAlign: 'middle',
});

const OrderItems = ({ item }: Props) => {
	const { image, quantity, price } = item;

	const id = 'id' in item ? item.id : item.product;

	const name = 'name' in item ? item.name : item.productName;

	return (
		<Table>
			<tbody>
				<Tr>
					<Td css={{ width: '70%' }}>
						<Flex align="center">
							<ItemImage
								src={image}
								alt={name}
								css={{ mr: '1rem', maxWidth: '10rem' }}
							/>
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

					<Td css={{ width: '30%' }}>
						<Paragraph
							fontSize={{
								'@initial': '2',
								'@md': '3',
							}}
						>
							{quantity} x ${price}
						</Paragraph>
					</Td>
				</Tr>
			</tbody>
		</Table>
	);
};

export default OrderItems;
