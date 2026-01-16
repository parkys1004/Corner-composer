import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootId = 'react-interactive-overlay';
let rootElement = document.getElementById(rootId);

if (!rootElement) {
  rootElement = document.createElement('div');
  rootElement.id = rootId;
  document.body.appendChild(rootElement);
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
