import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../app/hooks';
import Button from '../../components/Button';
import { Container, StyledContainer } from '../../components/Container';
import Flex from '../../components/Flex';
import {
	Heading2,
	Heading3,
	Heading4,
	Paragraph,
} from '../../components/Typography';
import CartItemsTable from '../../features/cart/CartItemsTable';
import {
	selectCartCount,
	selectCartItems,
} from '../../features/cart/cartSlice';

const Cart = () => {
	const cartItems = useAppSelector(selectCartItems);
	const itemsCount = useAppSelector(selectCartCount);
	const navigate = useNavigate();

	const handleClick = () => navigate('/shipping');

	return (
		<Container>
			<Heading2
				size={{
					'@initial': '3',
					'@md': '4',
				}}
				css={{ my: '2rem' }}
			>
				Shopping Cart
			</Heading2>
			{cartItems.length < 1 ? (
				<Heading3
					size={{
						'@initial': '2',
						'@md': '3',
					}}
					css={{ my: '2rem' }}
				>
					Your cart is empty
				</Heading3>
			) : (
				<Flex
					direction={{
						'@initial': 'column',
						'@lg': 'row',
					}}
					gap="4"
					justify="between"
					align={{
						'@initial': 'center',
						'@lg': 'start',
					}}
				>
					<CartItemsTable cartItems={cartItems} />
					<StyledContainer css={{ width: '100%', '@lg': { width: '20%' } }}>
						<Heading3
							size={{
								'@initial': '2',
								'@md': '3',
							}}
							css={{ mb: '2rem' }}
						>
							Subtotal
						</Heading3>
						<Heading4
							size={{
								'@initial': '1',
								'@md': '2',
							}}
							css={{ mb: '1rem' }}
						>
							{itemsCount} items
						</Heading4>
						<Paragraph css={{ mb: '2rem' }}>
							$
							{cartItems
								.reduce((acc, item) => acc + item.quantity * item.price, 0)
								.toFixed(2)}
						</Paragraph>

						<Button
							variant="main"
							size={{
								'@initial': 'small',
								'@lg': 'normal',
							}}
							fontSize="1"
							onClick={handleClick}
						>
							PROCEED TO CHECKOUT
						</Button>
					</StyledContainer>
				</Flex>
			)}
		</Container>
	);
};

export default Cart;
