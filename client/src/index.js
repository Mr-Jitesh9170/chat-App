import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserProvider, NotificationProvider } from './context/contextApi';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </UserProvider>
);

