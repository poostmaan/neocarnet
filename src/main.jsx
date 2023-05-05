import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter} from 'react-router-dom'
import { createRoot } from 'react-dom/client';

import { CarnetApp } from './CarnetApp';
import { persistor ,store } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import './main.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store  }>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <CarnetApp /> 
        </BrowserRouter> 
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
