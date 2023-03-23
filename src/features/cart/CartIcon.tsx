import { selectCartCount, toggleIsCartOpen } from './cartSlice';
import BagIcon from '../../components/BagIcon';
import { useAppSelector } from '../../app/hooks';
import { styled } from '../../../stitches.config';

const ItemCount = styled('span', {
	position: 'absolute',
	fontSize: '10px',
	fontWeight: 'bold',
	bottom: '4px',
	color: '$light',

	variants: {
		size: {
			small: {
				fontSize: '8px',
				bottom: '2px',
			},
			normal: {
				fontSize: '10px',
				bottom: '4px',
			},
		},
	},
});

const CartIcon = () => {
	const cartCount = useAppSelector(selectCartCount);

	return (
		<>
			<BagIcon />
			<ItemCount
				size={{
					'@initial': 'small',
					'@md': 'normal',
				}}
			>
				{cartCount}
			</ItemCount>
		</>
	);
};

export default CartIcon;
