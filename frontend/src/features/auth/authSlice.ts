import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface AuthState {
	accessToken: string | null;
}

const initialState: AuthState = { accessToken: null };

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentials: (state, action) => {
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

export const selectCurrentAccessToken = (state: RootState) =>
	state.auth.accessToken;
