import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import i18n from './i18n';
import AppNavigator from './navigation/AppNavigator';
import { store } from '../presentation/store/store';

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <I18nextProvider i18n={i18n}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </I18nextProvider>
      </SafeAreaProvider>
    </Provider>
  );
};

export default AppWrapper;