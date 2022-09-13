import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '../../app/hooks';

interface AuthState {
	accessToken: string | null;
}

const initialState: AuthState = { accessToken: null };

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentials: (state, action: PayloadAction<{ accessToken: string }>) => {
			const { accessToken } = action.payload;

			state.accessToken = accessToken;
		},
		clearCredentials: (state) => {
			state.accessToken = null;
		},
	},
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentAccessToken = () =>
	useAppSelector((state) => state.auth.accessToken);
