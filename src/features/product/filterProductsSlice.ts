import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface FilterState {
	keyword: string;
	minPriceLimit?: number;
	maxPriceLimit?: number;
	minRating?: number;
}

const initialState: FilterState = {
	keyword: '',
	minPriceLimit: undefined,
	maxPriceLimit: undefined,
	minRating: undefined,
};

const filterProductsSlice = createSlice({
	name: 'filterProducts',
	initialState,
	reducers: {
		setKeyword: (
			state,
			action: PayloadAction<Pick<FilterState, 'keyword'>>
		) => {
			const { keyword } = action.payload;

			state.keyword = keyword;
		},
		setMinPriceLimit: (
			state,
			action: PayloadAction<Pick<FilterState, 'minPriceLimit'>>
		) => {
			state.minPriceLimit = action.payload.minPriceLimit;
		},
		setMaxPriceLimit: (
			state,
			action: PayloadAction<Pick<FilterState, 'maxPriceLimit'>>
		) => {
			state.maxPriceLimit = action.payload.maxPriceLimit;
		},
		setMinRating: (
			state,
			action: PayloadAction<Pick<FilterState, 'minRating'>>
		) => {
			state.minRating = action.payload.minRating;
		},
	},
});

export const { setMaxPriceLimit, setMinPriceLimit, setMinRating, setKeyword } =
	filterProductsSlice.actions;

export default filterProductsSlice.reducer;

export const selectFilters = (state: RootState) => state.filter;

export const selectKeyword = (state: RootState) => state.filter.keyword;

export const selectMaxPriceLimit = (state: RootState) =>
	state.filter.maxPriceLimit;

export const selectMinPriceLimit = (state: RootState) =>
	state.filter.minPriceLimit;

export const selectMinRating = (state: RootState) => state.filter.minRating;
