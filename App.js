import React, { Component } from 'react';
import Main  from './src/Main';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import modules from 'src/modules';
import thunk from 'redux-thunk';
import {Text, TextInput} from 'react-native';

const store = createStore(modules, applyMiddleware(thunk));

export default class App extends Component {
  
  render() {
    if (Text.defaultProps == null) Text.defaultProps = {};
        Text.defaultProps.allowFontScaling = false;
    if (TextInput.defaultProps == null) TextInput.defaultProps = {};
        TextInput.defaultProps.allowFontScaling = false;
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}
