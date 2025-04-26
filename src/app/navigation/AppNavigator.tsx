import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LoginScreen } from '../../presentation/screens';
import SignUpScreen from '../../presentation/screens/SignUpScreen';
import ForgotPwScreen from '../../presentation/screens/ForgotPwScreen';
import MainScreen from '../../presentation/screens/MainScreen';
import { Word } from '../../domain/entities/word';
import VocabDetailScreen from '../../presentation/screens/VocabDetailScreen';

// Auth Stack Types
export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};

// Root Stack Types
export type RootStackParamList = {
  Auth: { screen: keyof AuthStackParamList };
  Main: undefined;
  VocabDetail: { word: Word };
  Dictionary: undefined;
};

// Navigation Props Types
export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
export type AuthStackNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen 
        name="Login" 
        component={LoginScreen}
      />
      <AuthStack.Screen 
        name="SignUp" 
        component={SignUpScreen}
      />
      <AuthStack.Screen 
        name="ForgotPassword" 
        component={ForgotPwScreen}
      />
    </AuthStack.Navigator>
  );
};

const AppNavigator = () => {
  // TODO: Add authentication state check
  const isAuthenticated = false;

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={isAuthenticated ? 'Main' : 'Auth'}
    >
      <RootStack.Screen 
        name="Auth" 
        component={AuthNavigator}
      />
      <RootStack.Screen 
        name="Main" 
        component={MainScreen}
      />
      <RootStack.Screen 
        name="VocabDetail" 
        component={VocabDetailScreen}
      />
    </RootStack.Navigator>
  );
};

export default AppNavigator;