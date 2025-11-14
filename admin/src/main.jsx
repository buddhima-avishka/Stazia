import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import AdminContextProvider from '../../admin/src/context/AdminContext.jsx';
import HotelContextProvider from '../../admin/src/context/HotelContext.jsx';
import AppContextProvider from '../../admin/src/context/AppContext.jsx';

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
  <BrowserRouter>
    <AdminContextProvider>
      <HotelContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </HotelContextProvider>
    </AdminContextProvider>
    
  </BrowserRouter>
</StrictMode>,
);


