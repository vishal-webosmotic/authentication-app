import React from 'react';

import ReactDOM from 'react-dom/client';

import '@fortawesome/fontawesome-free/css/all.min.css';
import App from './App';
import { UserProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
    <App />
  </UserProvider>
);
