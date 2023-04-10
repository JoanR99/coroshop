import SearchBar from './SearchBar';
import StyledLink, { styledLinkCss } from './StyledLink';
import { selectIsAdmin } from '../features/auth/authSlice';
import { useAppSelector } from '../app/hooks';
import { styled, css, keyframes } from '../../stitches.config';
import CartDropDown from '../features/cart/CartDropDown';
import { Container, styledContainerCss } from './Container';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import Flex from './Flex';

export const navbarCss = css({
	variants: {
		size: {
			small: {
				height: '3.5rem',
				padding: '0.5rem',
			},
			normal: {
				height: '5rem',
				padding: '1rem',
			},
		},
		color: {
			main: {
				backgroundColor: '$main',
			},
			light: {
				backgroundColor: '$light',
			},
		},
	},
});

const fadeIn = keyframes({
	from: {
		opacity: 0,
	},
	to: {
		opacity: 1,
	},
});
const fadeOut = keyframes({
	from: {
		opacity: 1,
	},
	to: {
		opacity: 0,
	},
});

const enterFromRight = keyframes({
	from: {
		opacity: 0,
		transform: 'translateX(200px)',
	},
	to: {
		opacity: 1,
		transform: 'translateX(0)',
	},
});
const enterFromLeft = keyframes({
	from: {
		opacity: 0,
		transform: 'translateX(-200px)',
	},
	to: {
		opacity: 1,
		transform: 'translateX(0)',
	},
});
const exitToRight = keyframes({
	from: {
		opacity: 1,
		transform: 'translateX(0)',
	},
	to: {
		opacity: 0,
		transform: 'translateX(200px)',
	},
});
const exitToLeft = keyframes({
	from: {
		opacity: 1,
		transform: 'translateX(0)',
	},
	to: {
		opacity: 0,
		transform: 'translateX(-200px)',
	},
});

const scaleIn = keyframes({
	from: {
		opacity: 0,
		transform: 'rotateX(-30deg) scale(0.9)',
	},
	to: {
		opacity: 1,
		transform: 'rotateX(0deg) scale(1)',
	},
});

const scaleOut = keyframes({
	from: {
		opacity: 1,
		transform: 'rotateX(0) scale(1)',
	},
	to: {
		opacity: 0,
		transform: 'rotateX(-10deg) scale(0.95)',
	},
});

const NavbarBody = styled('div', navbarCss);

const NavbarContainer = styled(Container, {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	height: '100%',
});

const Nav = styled(NavigationMenu.Root, {
	position: 'relative',
	zIndex: 1,
	height: '100%',
	display: 'flex',
	alignItems: 'center',
});

const List = styled(NavigationMenu.List, {
	display: 'flex',
	columnGap: '1rem',
	justifyContent: 'center',
	listStyle: 'none',
	margin: 0,
	padding: 0,
	alignItems: 'center',
});

const Content = styled(NavigationMenu.Content, {
	position: 'absolute',
	top: 0,
	left: 0,
	width: 'auto',
	animationDuration: '250ms',
	animationTimingFunction: 'ease',
	backgroundColor: 'white',

	"&[data-motion='from-start']": {
		animationName: `${enterFromLeft}`,
	},
	"&[data-motion='from-end']": {
		animationName: `${enterFromRight}`,
	},
	"&[data-motion='to-start']": {
		animationName: `${exitToLeft}`,
	},
	"&[data-motion='to-end']": {
		animationName: `${exitToRight}`,
	},
});

const ItemList = styled('ul', {
	display: 'grid',
	padding: '22px',
	margin: 0,
	columnGap: '10px',
	listStyle: 'none',
	gridTemplateColumns: '1fr',
});

const ViewportPosition = styled('div', {
	position: 'absolute',
	display: 'flex',
	justifyContent: 'center',
	width: '100%',
	top: '100%',
	left: 0,
	perspective: '2000px',
});

const MenuViewport = styled(NavigationMenu.Viewport, styledContainerCss, {
	position: 'relative',
	marginTop: '10px',
	width: 'var(--radix-navigation-menu-viewport-width)',
	backgroundColor: 'white',
	borderRadius: '6px',
	overflow: 'hidden',
	boxShadow:
		'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
	transition: 'width, height, 300ms ease',
	height: 'var(--radix-navigation-menu-viewport-height)',

	"&[data-state='open']": {
		animation: `${scaleIn} 200ms ease`,
	},
	"&[data-state='closed']": {
		animation: `${scaleOut} 200ms ease`,
	},
});

const Trigger = styled(NavigationMenu.Trigger, styledLinkCss, {
	border: 'none',
	backgroundColor: 'transparent',
	color: '$light',
	'&:hover': {
		color: '$action',
	},
	display: 'block',
});

const Item = styled(NavigationMenu.Item, {});

const Link = styled('button', {
	border: 'none',
	backgroundColor: 'transparent',
	color: '$light',
	'&:hover': {
		color: '$action',
	},
	display: 'block',
});

const Indicator = styled(NavigationMenu.Indicator, {
	display: 'flex',
	alignItems: 'flex-end',
	justifyContent: 'center',
	height: '10px',
	top: '100%',
	overflow: 'hidden',
	zIndex: 1,
	transition: 'width, transform 250ms ease',

	"&[data-state='visible']": {
		animation: `${fadeIn} 200ms ease`,
	},

	"&[data-state='hidden']": {
		animation: `${fadeOut} 200ms ease`,
	},
});

const Arrow = styled('div', {
	position: 'relative',
	top: '70%',
	backgroundColor: '$main_light',
	width: '10px',
	height: '10px',
	transform: 'rotate(45deg)',
	borderTopLeftRadius: '2px',
});

const Navbar = () => {
	const isAdmin = useAppSelector(selectIsAdmin);
	return (
		<NavbarBody
			size={{
				'@initial': 'small',
				'@sm': 'normal',
			}}
			color="main"
		>
			<NavbarContainer>
				<Flex gap={1} align="center">
					<Link>
						<StyledLink
							to="/products"
							theme="light"
							fontSize={{
								'@initial': 1,
								'@sm': 2,
							}}
						>
							Products
						</StyledLink>
					</Link>
					<Nav css={{ minWidth: '5rem' }}>
						<List>
							<Item>
								<Trigger
									theme="light"
									fontSize={{
										'@initial': 1,
										'@sm': 2,
									}}
								>
									Categories
								</Trigger>
								<Content>
									<ItemList>
										<StyledLink
											to="/categories/Phones"
											theme="dark"
											fontSize={{
												'@initial': 1,
												'@sm': 2,
											}}
										>
											Phones
										</StyledLink>
										<StyledLink
											to="/categories/Laptops"
											theme="dark"
											fontSize={{
												'@initial': 1,
												'@sm': 2,
											}}
										>
											Laptops
										</StyledLink>
										<StyledLink
											to="/categories/TV"
											theme="dark"
											fontSize={{
												'@initial': 1,
												'@sm': 2,
											}}
										>
											TV
										</StyledLink>
										<StyledLink
											to="/categories/Accessories"
											theme="dark"
											fontSize={{
												'@initial': 1,
												'@sm': 2,
											}}
										>
											Accessories
										</StyledLink>
									</ItemList>
								</Content>
							</Item>

							{isAdmin && (
								<Item>
									<Trigger
										theme="light"
										fontSize={{
											'@initial': 1,
											'@sm': 2,
										}}
									>
										Admin
									</Trigger>
									<Content>
										<ItemList>
											<StyledLink
												to="/admin/product-list"
												theme="dark"
												fontSize={{
													'@initial': 1,
													'@sm': 2,
												}}
											>
												Products
											</StyledLink>
											<StyledLink
												to="/admin/user-list"
												theme="dark"
												fontSize={{
													'@initial': 1,
													'@sm': 2,
												}}
											>
												Users
											</StyledLink>
											<StyledLink
												to="/admin/order-list"
												theme="dark"
												fontSize={{
													'@initial': 1,
													'@sm': 2,
												}}
											>
												Orders
											</StyledLink>
										</ItemList>
									</Content>
								</Item>
							)}

							<Indicator>
								<Arrow />
							</Indicator>
						</List>

						<ViewportPosition>
							<MenuViewport />
						</ViewportPosition>
					</Nav>
				</Flex>

				<SearchBar />

				<CartDropDown />
			</NavbarContainer>
		</NavbarBody>
	);
};

export default Navbar;
