import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import AppNavigator from './navigation/AppNavigator';

const AppWrapper = () => {
  return (
    <SafeAreaProvider>
      <I18nextProvider i18n={i18n}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </I18nextProvider>
    </SafeAreaProvider>
  );
};

export default AppWrapper;