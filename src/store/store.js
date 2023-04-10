import { configureStore } from '@reduxjs/toolkit';
import { uiSlice } from './';
import { authSlice } from './auth/';


export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        ui: uiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})
