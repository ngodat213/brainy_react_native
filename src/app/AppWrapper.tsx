import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../core/theme/ThemeContext';
import AppNavigator from './navigation/AppNavigator';
import { store } from '../presentation/store/store';
import { NavigationContainer } from '@react-navigation/native';
import '../app/i18n';

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <StatusBar barStyle="dark-content" />
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  )
}

export default AppWrapper;