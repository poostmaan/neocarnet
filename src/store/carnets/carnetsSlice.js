import { createSlice } from "@reduxjs/toolkit";

export const carnetsSlice = createSlice({
  name: "carnets",
  initialState: {
    total: [],
    activeCarnet: {},
    loading: false,
    errorMessage: "",
    editor: {
      saved: false,
      fields: []
    }
  },
  reducers: {
    setCarnets: (state, {payload}) => {
      state.total = payload.total;
      state.loading = false;
    },
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
			state.editor.fields = payload.fields;
		},
    setSavedCarnet: (state) => {
      state.editor.saved = true;
    },
		onLogoutCarnet: (state) => {
			state.loading = false; 
			state.errorMessage = null;
		},
    onEmptyEditor: (state) => {
      state.editor = {
        saved: false,
        fields: []
      }
    }
  }
});

export const {
  setActiveCarnet,
  setCarnets,
  setErrorMessage,
  setFields,
  setLoading,
  setSavedCarnet,
  onLogoutCarnet,
  onEmptyEditor
} = carnetsSlice.actions;
