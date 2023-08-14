import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/';
import storageSession from 'redux-persist/lib/storage/session'
import { persistReducer, persistStore } from 'redux-persist';
import { apikeySlice } from './apikey';
import { personsSlice } from './persons/';
import { carnetsSlice } from './carnets';

const persistConfig = {
    key: 'root',
    storage: storageSession,
}

const rootReducer = combineReducers({

    auth: authSlice.reducer,
    apikey: apikeySlice.reducer, 
    persons: personsSlice.reducer,
    // carnet: carnetSlice.reducer,
    carnets: carnetsSlice.reducer

    // TODO: AGREGAR EL CARNETSLICE
    // TODO: AGREGAR LA LLAMADA LA API MEDIANTE EL BOTON GUARDAR

})

const finalReducer = persistReducer(persistConfig, rootReducer); 

export const store = configureStore({ 
    reducer: finalReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false    
    })
})

export const persistor = persistStore(store);
