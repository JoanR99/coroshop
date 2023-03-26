import { styled } from '../../../stitches.config';
import { StyledContainer } from '../../components/Container';
import { Heading4 } from '../../components/Typography';
import { CartItem } from './cartTypes';
import DetailedCartItem from './DetailedCartItem';

type Props = {
	cartItems: CartItem[];
};

const Table = styled('table', {
	width: '100%',
	borderSpacing: '1rem',
});

const Tr = styled('tr', {
	textAlign: 'left',
});

const Th = styled('th', {
	width: '20%',
});

const CartItemsTable = ({ cartItems }: Props) => {
	return (
		<StyledContainer css={{ width: '100%', '@lg': { width: '75%' } }}>
			<Table>
				<thead>
					<Tr>
						<Th css={{ width: '40%' }}>
							<Heading4
								size={{
									'@initial': '1',
									'@md': '2',
								}}
							>
								Product
							</Heading4>
						</Th>

						<Th>
							<Heading4
								size={{
									'@initial': '1',
									'@md': '2',
								}}
							>
								Price
							</Heading4>
						</Th>

						<Th>
							<Heading4
								size={{
									'@initial': '1',
									'@md': '2',
								}}
							>
								Quantity
							</Heading4>
						</Th>

						<Th>
							<Heading4
								size={{
									'@initial': '1',
									'@md': '2',
								}}
							>
								Remove
							</Heading4>
						</Th>
					</Tr>
				</thead>
				<tbody>
					{cartItems.map((cartItem) => (
						<DetailedCartItem key={cartItem.id} cartItem={cartItem} />
					))}
				</tbody>
			</Table>
		</StyledContainer>
	);
};

export default CartItemsTable;
