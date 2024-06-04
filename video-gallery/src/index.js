
// index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App'; // Assuming your main component is named App

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/*
   
}*/
