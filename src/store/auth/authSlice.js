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
    errorMessage: "",
    bussinessPersons: []
  },
  reducers: {
    login: (state, { payload }) => {
      state.bussiness = payload.bussiness;
      state.authenticated = authStatuses.authenticated;
      state.errorMessage = "";
      state.bussinessPersons = payload.bussiness.bussinessPersons;
    },
    logout: (state) => {
      state.bussiness = null;
      state.authenticated = authStatuses.notAuthenticated;
    },
    checking: (state) => {
      state.authenticated = authStatuses.cheking;
    },
    error: (state, { payload }) => {
      state.errorMessage = payload.error
    },
    cleanError: (state) => {
      state.errorMessage = "";
    },
    setPersons: (state, { payload }) => {
      state.bussinessPersons = payload.bussinessPersons;
    }
  },
});

export const { checking, login, logout, error, cleanError, setPersons } = authSlice.actions;
