import SearchBar from './SearchBar';
import { StyledLink5, LinkContainer } from './StyledLink';
import { selectIsAdmin } from '../features/auth/authSlice';
import { useAppSelector } from '../app/hooks';
import { styled } from '../../stitches.config';
import CartDropDown from '../features/cart/CartDropDown';
import { Container } from './Container';

const NavbarBody = styled('div', {
	backgroundColor: '$main',

	variants: {
		height: {
			small: {
				height: '3.5rem',
				padding: '0.5rem',
			},
			normal: {
				height: '5rem',
				padding: '1rem',
			},
		},
	},
});

const NavbarContainer = styled(Container, {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	height: '100%',
});

const Navbar = () => {
	const isAdmin = useAppSelector(selectIsAdmin);
	return (
		<NavbarBody
			height={{
				'@initial': 'small',
				'@sm': 'normal',
			}}
		>
			<NavbarContainer>
				<LinkContainer
					gap={{
						'@initial': '1',
						'@sm': '2',
					}}
				>
					<StyledLink5
						to="/products"
						theme="light"
						size={{
							'@initial': 'small',
							'@sm': 'normal',
						}}
					>
						Products
					</StyledLink5>
					<StyledLink5
						to="/categories"
						theme="light"
						size={{
							'@initial': 'small',
							'@sm': 'normal',
						}}
					>
						Categories
					</StyledLink5>
					{isAdmin && (
						<StyledLink5
							to="/admin/product-list"
							theme="light"
							size={{
								'@initial': 'small',
								'@sm': 'normal',
							}}
						>
							Admin
						</StyledLink5>
					)}
				</LinkContainer>
				<div>
					<SearchBar />
				</div>
				<CartDropDown />
			</NavbarContainer>
		</NavbarBody>
	);
};

export default Navbar;
