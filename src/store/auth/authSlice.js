import { createSlice } from "@reduxjs/toolkit";
import { authStatuses } from "../../constants";

const defaultBussiness = {
  id: null,
  bussinessName: null,
  rif: null,
  phone: null,
  email: null,
  direction: null,
  logourl: null,
  bussinessType: null,
  stateCountry: null,
  latitude: null,
  longitude: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    authenticated: authStatuses.notAuthenticated,
    bussiness: null,
    errorMessage: ""
  },
  reducers: {
    login: (state, { payload }) => {
      state.bussiness = payload.bussiness;
      state.authenticated = authStatuses.authenticated;
      state.errorMessage = "";
    },
    logout: (state) => {
      state.bussiness = null;
      state.authenticated = authStatuses.notAuthenticated;
    },
    checking: (state) => {
      state.authenticated = authStatuses.cheking;
    },
    cleanError: (state) => {
      state.errorMessage = "";
    },
    error: (state, { payload }) => {
      state.errorMessage = payload.error
    }
  },
});

export const { 
  checking, 
  cleanError,
  error, 
  login, 
  logout, 
} = authSlice.actions;
