import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from "react-router-dom";
import App from './App';
import history from './history';
import ErrorBoundry from './ErrorBoundry';

import './styles/index.css';

ReactDOM.render(
  <Router history={history}>
    <ErrorBoundry>
      <App />
    </ErrorBoundry>
  </Router>,
  document.getElementById('root')
);