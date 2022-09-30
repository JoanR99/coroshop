import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
	CartState,
	CartItem,
	ShippingAddress,
	PaymentMethod,
} from './cartTypes';

const initialState: CartState = {
	cartItems: [],
	isCartOpen: false,
	shippingAddress: {
		address: '',
		city: '',
		postalCode: '',
		country: '',
	},
	paymentMethod: 'PayPal',
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
		},
		removeCartItem: (state, action: PayloadAction<{ id: string }>) => {
			const { id } = action.payload;
			state.cartItems = state.cartItems.filter(
				(cartItem) => cartItem.id !== id
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
		},
		toggleIsCartOpen: (state) => {
			state.isCartOpen = !state.isCartOpen;
		},
		setShippingAddress: (state, action: PayloadAction<ShippingAddress>) => {
			state.shippingAddress = action.payload;
		},
		setPaymentMethod: (state, action: PayloadAction<PaymentMethod>) => {
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

export const selectCartItems = (state: RootState) => state.cart.cartItems;

export const selectIsCartOpen = (state: RootState) => state.cart.isCartOpen;

export const selectShippingAddress = (state: RootState) =>
	state.cart.shippingAddress;

export const selectPaymentMethod = (state: RootState) =>
	state.cart.paymentMethod;

export const selectCartCount = (state: RootState) =>
	state.cart.cartItems.reduce(
		(total, cartItem) => total + cartItem.quantity,
		0
	);

export const selectCartTotalPrice = (state: RootState) =>
	state.cart.cartItems.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0
	);
