import { createSlice } from "@reduxjs/toolkit";

export const personsSlice = createSlice({
	name: "persons",
	initialState: {
		bussinessPersons: [],
		uploadedPeople: "",
		uploadedSucessfully: "",
		uploadedFailed: "",
		loading: true,
		errorMessage: null,
	},
	reducers: {
		setBussinessPersons: (state, { payload }) => {
			state.bussinessPersons = payload.bussinessPersons;
		},
		uploadPeople: (state, { payload }) => {
			state.uploadedPeople = payload.uploadedPeople;
			state.uploadedSucessfully = payload.uploadedPeople.match(/Registro insertado exitosamente/ig) && payload.uploadedPeople.match(/Registro insertado exitosamente/ig).length;
			state.uploadedFailed = payload.uploadedPeople.match(/Registro no insertado/ig) && payload.uploadedPeople.match(/Registro no insertado/ig).length;
		},
		cleanError: (state) => {
			state.errorMessage = "";
		},
		cleanPeople: (state) => {
			state.uploadedPeople = "";
			state.uploadedSucessfully = "";
			state.uploadedFailed = "";
		},
		setErrorMessage: (state, { payload }) => {
			state.errorMessage = payload.errorMessage;
		},
		setLoading: (state) => {
			state.loading = true;
		},
		logoutPersons: (state) => {
			state.bussinessPersons = [],
			state.uploadedPeople = "",
			state.uploadedSucessfully = "",
			state.uploadedFailed = "",
			state.loading = true
			state.errorMessage = null
		}	
	},
});

export const { setBussinessPersons, uploadPeople, cleanError, cleanPeople, setErrorMessage, setLoading, logoutPersons } = personsSlice.actions;