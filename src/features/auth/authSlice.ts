import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

import { RootState } from '../../app/store';

interface AuthState {
	accessToken: string | null;
	isAdmin: boolean;
	userId: string | null;
}

const initialState: AuthState = {
	accessToken: null,
	isAdmin: false,
	userId: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentials: (
			state,
			action: PayloadAction<{
				accessToken: string;
			}>
		) => {
			const { accessToken } = action.payload;

			const decoded = accessToken
				? jwtDecode<{ isAdmin: boolean; userId: string }>(accessToken)
				: undefined;

			const isAdmin = decoded?.isAdmin ?? false;
			const userId = decoded?.userId ?? null;

			state.accessToken = accessToken;
			state.isAdmin = isAdmin;
			state.userId = userId;
		},
		clearCredentials: (state) => {
			state.accessToken = null;
			state.isAdmin = false;
			state.userId = null;
		},
	},
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentAccessToken = (state: RootState) =>
	state.auth.accessToken;

export const selectIsAdmin = (state: RootState) => state.auth.isAdmin;

export const selectUserId = (state: RootState) => state.auth.userId;
