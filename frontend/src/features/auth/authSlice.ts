import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';

interface AuthState {
	accessToken: string | null;
	isAdmin: boolean | null;
}

const initialState: AuthState = { accessToken: null, isAdmin: null };

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentials: (state, action: PayloadAction<{ accessToken: string }>) => {
			const { accessToken } = action.payload;

			state.accessToken = accessToken;
		},
		setIsAdmin: (state, action: PayloadAction<{ isAdmin: boolean }>) => {
			const { isAdmin } = action.payload;

			state.isAdmin = isAdmin;
		},
		clearCredentials: (state) => {
			state.accessToken = null;
			state.isAdmin = null;
		},
	},
});

export const { setCredentials, clearCredentials, setIsAdmin } =
	authSlice.actions;

export default authSlice.reducer;

export const selectCurrentAccessToken = (state: RootState) =>
	state.auth.accessToken;

export const selectIsAdmin = (state: RootState) => state.auth.isAdmin;
