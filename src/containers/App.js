import React, { Component } from 'react';
import store from '../store';
import { Provider } from 'react-redux';
import Bowling from './Bowling';

export default class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <Bowling />
        </Provider>
      </div>
    );
  }
}
