import { createSlice } from "@reduxjs/toolkit";
import { authStatuses } from "../../constants";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    authenticated: authStatuses.notAuthenticated,
    bussinessName: null,
    id: null,
    errorMessage: ""
  },
  reducers: {
    login: (state, { payload }) => {
      state.id = payload.id;
      state.bussinessName = payload.bussinessName;
      state.authenticated = authStatuses.authenticated;
    },
    logout: (state) => {
      state.id = null;
      state.bussinessName = null;
      state.authenticated = authStatuses.notAuthenticated;
    },
    checking: (state) => {
      state.authenticated = authStatuses.cheking;
    },
    error: (state, { payload }) => {
      state.errorMessage = payload.error
    }
  },
});

export const { checking, login, logout, error } = authSlice.actions;
