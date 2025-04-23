import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import BaseButtonNavigator from '../../components/base/BaseButtonNavigator';

const MainScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BaseButtonNavigator />
    </SafeAreaView>
  );
};

export default MainScreen; 