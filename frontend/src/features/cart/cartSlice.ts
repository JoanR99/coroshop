import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '../../app/hooks';
import { Product } from '../product/productTypes';

export interface CartItem extends Product {
	quantity: number;
}

export interface ShippingAddress {
	address: string;
	city: string;
	postalCode: string;
	country: string;
}

interface CartState {
	cartItems: CartItem[];
	cartCount: number;
	isCartOpen: boolean;
	shippingAddress: ShippingAddress;
	paymentMethod: string;
}

const initialState: CartState = {
	cartItems: [],
	cartCount: 0,
	isCartOpen: false,
	shippingAddress: {
		address: '',
		city: '',
		postalCode: '',
		country: '',
	},
	paymentMethod: '',
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<CartItem>) => {
			const cartItemToAdd = action.payload;
			const existingCartItem = state.cartItems.find(
				(cartItem) => cartItem.id === cartItemToAdd.id
			);

			if (existingCartItem) {
				const updatedCartItems = state.cartItems.map((cartItem) => {
					return cartItem.id === cartItemToAdd.id
						? {
								...cartItem,
								quantity: cartItem.quantity + cartItemToAdd.quantity,
						  }
						: cartItem;
				});

				state.cartItems = updatedCartItems;
			} else {
				state.cartItems = [...state.cartItems, cartItemToAdd];
			}

			state.cartCount = state.cartItems.reduce(
				(total, cartItem) => total + cartItem.quantity,
				0
			);
		},
		removeCartItem: (state, action: PayloadAction<{ id: string }>) => {
			const { id } = action.payload;
			state.cartItems = state.cartItems.filter(
				(cartItem) => cartItem.id !== id
			);
			state.cartCount = state.cartItems.reduce(
				(total, cartItem) => total + cartItem.quantity,
				0
			);
		},
		updateCartItemQuantity: (
			state,
			action: PayloadAction<{ id: string; quantity: number }>
		) => {
			const { id, quantity } = action.payload;
			state.cartItems = state.cartItems.map((cartItem) =>
				cartItem.id === id ? { ...cartItem, quantity: quantity } : cartItem
			);
			state.cartCount = state.cartItems.reduce(
				(total, cartItem) => total + cartItem.quantity,
				0
			);
		},
		toggleIsCartOpen: (state) => {
			state.isCartOpen = !state.isCartOpen;
		},
		setShippingAddress: (state, action: PayloadAction<ShippingAddress>) => {
			state.shippingAddress = action.payload;
		},
		setPaymentMethod: (state, action: PayloadAction<string>) => {
			state.paymentMethod = action.payload;
		},
	},
});

export const {
	addToCart,
	removeCartItem,
	updateCartItemQuantity,
	toggleIsCartOpen,
	setShippingAddress,
	setPaymentMethod,
} = cartSlice.actions;

export default cartSlice.reducer;

export const selectCartItems = () =>
	useAppSelector((state) => state.cart.cartItems);

export const selectIsCartOpen = () =>
	useAppSelector((state) => state.cart.isCartOpen);

export const selectCartCount = () =>
	useAppSelector((state) => state.cart.cartCount);

export const selectShippingAddress = () =>
	useAppSelector((state) => state.cart.shippingAddress);

export const selectPaymentMethod = () =>
	useAppSelector((state) => state.cart.paymentMethod);
