/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider } from 'react-redux';
import { store } from './src/store/index';

function App() {
  
  return (
  <Provider store={store}>
      <AppNavigator/>
      </Provider>
  );
}

export default App;
