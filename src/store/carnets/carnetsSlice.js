import { createSlice } from "@reduxjs/toolkit";

export const carnetsSlice = createSlice({
  name: "carnets",
  initialState: {
    total: [],
    active: {},
    loading: false,
    errorMessage: "",
  },
  reducers: {
    setCarnets: (state, {payload}) => {
      state.total = payload.total;
      state.loading = false;
    },
    setActiveCarnet: (state, { payload }) => {
      state.loading = false;
      state.active = payload.active;
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
		},
		onLogoutCarnet: (state) => {
			state.activeCarnet = {};
			state.fields = [];
			state.loading = false; 
			state.errorMessage = null;
		}
  }
});

export const {
  setActiveCarnet,
  setCarnets,
  setErrorMessage,
  setFields,
  setLoading,
  onLogoutCarnet
} = carnetsSlice.actions;
