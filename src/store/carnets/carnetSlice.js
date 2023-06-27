import { createSlice } from "@reduxjs/toolkit";

export const carnetSlice = createSlice({
	name: "carnets",
	initialState: {
		activeCarnet: {},
		loading: false,
		errorMessage: null,
	},
	reducers: {
		setActiveCarnet: (state, { payload }) => {
            state.loading = false;
			state.activeCarnet = payload.activeCarnet;
		},
		setErrorMessage: (state, { payload }) => {
            state.loading = false;
			state.errorMessage = payload.errorMessage;
		},
		setLoading: (state) => {
			state.loading = true;
		}
	},
});

export const { 
    setActiveCarnet,
    setErrorMessage,
    setLoading
} = carnetSlice.actions;