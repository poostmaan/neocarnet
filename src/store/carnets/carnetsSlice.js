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
    toggleCarnetStatus: (state, { payload }) => {
      // Toma todos los carnets
      state.total = state.total.map(carnet => {
        // Consigue el carnet filtrado por id
        if(carnet.id === payload.carnetid) {
          // Lo establece como deshabilitado
          carnet.isDisabled = payload.isDisabled;
        }
        return carnet;
      });
      state.loading = false;
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
  toggleCarnetStatus,
  onLogoutCarnet,
  onEmptyEditor
} = carnetsSlice.actions;
