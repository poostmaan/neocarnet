import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { uiSlice } from './';
import { authSlice } from './auth/';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { apikeySlice } from './apikey';

const persistConfig = {
    key: 'root',
    storage,
}
import { personsSlice } from './persons/';

const authPersistedReducer = persistReducer(persistConfig, authSlice.reducer);
// const apikeyPersistReducer = (persistConfig, apikeySlice.reducer);

// const rootReducer = combineReducers()

export const store = configureStore({
    reducer: {
        auth: authPersistedReducer,
        apikey: apikeySlice.reducer, 
        persons: personsSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export const persistor = persistStore(store);
