import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('main_app');
  ReactDOM.render(<App/>, app);
});
