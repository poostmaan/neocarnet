import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter} from 'react-router-dom'
import { createRoot } from 'react-dom/client';

import { CarnetApp } from './CarnetApp';
import { store } from './store';
import './styles.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store  }>
        <BrowserRouter>
          <CarnetApp /> 
        </BrowserRouter> 
    </Provider>
  </React.StrictMode>
)
