import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const rootEl = document.querySelector('#root');

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootEl
);

registerServiceWorker();
