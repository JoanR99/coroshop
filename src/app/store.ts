import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
import filterProductsReducer from '../features/product/filterProductsSlice';
import { apiSlice } from './api/apiSlice';

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		auth: authReducer,
		cart: cartReducer,
		filter: filterProductsReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: true,
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
