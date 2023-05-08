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
    bussinessPersons: [],
    uploadedPeople: "",
    uploadedSucessfully: "",
    uploadedFailed: ""
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
      state.authenticated = authStatuses.notAuthenticated;
      state.errorMessage = payload.error
    },
    cleanError: (state) => {
      state.errorMessage = "";
    },
    setBussinessPersons: (state, { payload }) => {
      state.bussinessPersons = payload.bussinessPersons;
    },
    setPersons: (state, { payload }) => {
      state.bussinessPersons = payload.bussinessPersons;
    },
    uploadPeople: (state, { payload }) => {
      state.uploadedPeople = payload.uploadedPeople;
      state.uploadedSucessfully = payload.uploadedPeople.match(/Registro insertado exitosamente/ig) && payload.uploadedPeople.match(/Registro insertado exitosamente/ig).length;
      state.uploadedFailed = payload.uploadedPeople.match(/Registro no insertado/ig) && payload.uploadedPeople.match(/Registro no insertado/ig).length;
    },
    cleanPeople: (state) => {
      state.uploadedPeople = "";
      state.uploadedSucessfully = "";
      state.uploadedFailed = "";
    }
  },
});

export const {
  checking,
  cleanError,
  error,
  login,
  logout,
  setPersons, setBussinessPersons,uploadPeople, cleanPeople
} = authSlice.actions;
