import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '../../app/hooks';
import { Product } from '../product/productTypes';

interface CartItem extends Product {
	quantity: number;
}

interface CartState {
	cartItems: CartItem[];
}

const initialState: CartState = {
	cartItems: [],
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
	},
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;

export const selectCartItems = () =>
	useAppSelector((state) => state.cart.cartItems);
