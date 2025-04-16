import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LoginScreen } from '../../presentation/screens';
import SignUpScreen from '../../presentation/screens/SignUpScreen';
import HomeScreen from '../../presentation/screens/HomeScreen';
import ForgotPwScreen from '../../presentation/screens/ForgotPwScreen';

export type RootStackParamList = {
  LoginScreen: undefined;
  SignUpScreen: undefined;
  HomeScreen: undefined;
  ForgotPwScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="LoginScreen" 
        component={LoginScreen}
        options={{
          title: 'Login', 
        }}
      />
      <Stack.Screen 
        name="SignUpScreen" 
        component={SignUpScreen}
        options={{
          title: 'Sign Up',
        }}
      />
      <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen 
        name="ForgotPwScreen" 
        component={ForgotPwScreen}
        options={{
          title: 'Forgot Password',
        }}
      />
    </Stack.Navigator>
  );
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
export default AppNavigator;