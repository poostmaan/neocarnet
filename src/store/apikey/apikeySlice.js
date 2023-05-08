import { createSlice } from "@reduxjs/toolkit";

export const apikeySlice = createSlice({
  name: "apikey",
  initialState: {
    newApikey: {},
    deletedApikey: {},
    apikeys: [],
    loading: true,
    errorMessage: null, 
  },
  reducers: {
    setApikeys: (state, { payload }) => {
      state.apikeys = payload.apikeys;
      state.loading = false;
      state.errorMessage = null;
    },
    setApikey: (state, { payload }) => {
      state.newApikey = payload.apikey;
      state.apikeys.push(payload.apikey);
      state.loading = false;
      state.errorMessage = null;
    },
    deleteApikey: (state, { payload }) => {
      state.deletedApikey = state.apikeys.find((e) => e.id === payload.apikey.id);
      state.apikeys = state.apikeys.filter((e) => e.id !== payload.apikey.id);
      state.loading = false;
      state.errorMessage = null;
    },
    setErrorMessage: (state, {payload}) => {
      state.loading = false;
      state.errorMessage = payload.errorMessage; 
    },
    setLoading: (state) => {
      state.loading = true;
    }
  },
});

export const { setApikeys, setApikey, deleteApikey, setErrorMessage, setLoading } = apikeySlice.actions;
