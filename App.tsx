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
import { toastConfig } from './src/utils/toastConfig';
import Toast from 'react-native-toast-message';

function App() {
  
  return (
  <Provider store={store}>
      <AppNavigator/>
      <Toast config={toastConfig} />
      </Provider>
  );
}

export default App;
