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
    /* device text 사이즈에 영향 안받게 설정 */
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
