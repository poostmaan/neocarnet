import { createSlice } from "@reduxjs/toolkit";

export const carnetSlice = createSlice({
	name: "carnets",
	initialState: {
		activeCarnet: {},
		fields: [], 
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
		},
		setFields: (state, { payload }) => {
			state.fields = payload.fields;
		}
	},
});

export const { 
    setActiveCarnet,
    setErrorMessage,
    setLoading,
	setFields
} = carnetSlice.actions;