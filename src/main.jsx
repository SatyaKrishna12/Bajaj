import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Wrap your App with BrowserRouter
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
