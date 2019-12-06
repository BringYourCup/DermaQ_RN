import React, { Component } from 'react';
import Main  from './src/Main';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import modules from 'src/modules';
import thunk from 'redux-thunk'

const store = createStore(modules, applyMiddleware(thunk));
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}
