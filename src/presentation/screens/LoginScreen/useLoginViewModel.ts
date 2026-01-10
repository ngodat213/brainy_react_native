import { useState } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../app/navigation/AppNavigator';
import { useSelector } from 'react-redux';
import { loginThunk } from '../../store/auth/authThunks';
import { selectAuthError, selectAuthLoading, selectUsername, selectPassword } from '../../store/auth/authSelectors';
import { useAppDispatch } from '../../store/hooks';
import { setPassword, setUsername } from '../../store/auth/authSlice';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const useLoginViewModel = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const dispatch = useAppDispatch();
  
  // Get state from Redux
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const username = useSelector(selectUsername);
  const password = useSelector(selectPassword);
  
  const handleLogin = async () => {
    try {
      // Dispatch login thunk
      const resultAction = await dispatch(loginThunk({ username: username || '', password: password || '' }));
      
      if (loginThunk.fulfilled.match(resultAction)) {
        // After successful login, navigate to Main screen
        navigation.navigate('Main');
      } else if (loginThunk.rejected.match(resultAction) && resultAction.error) {
        // Error is handled by the reducer and available in the error selector
        const errorMessage = t(resultAction.error.message || 'common.unknownError');
        Alert.alert(t('common.error'), errorMessage);
      }
    } catch (error: any) {
      Alert.alert(t('common.error'), t('common.unknownError'));
    }
  };

  const redirectToRegister = () => {
    // Navigate to SignUp screen in Auth stack
    navigation.navigate('Auth', { screen: 'SignUp' });
  };

  const handleForgotPassword = () => {
    // Navigate to ForgotPassword screen in Auth stack
    navigation.navigate('Auth', { screen: 'ForgotPassword' });
  };

  const onChangeUsername = (text: string) => {
    dispatch(setUsername(text));
  };

  const onChangePassword = (text: string) => {
    dispatch(setPassword(text));
  };

  return {
    username,
    password,
    loading,
    error,
    onChangeUsername,
    onChangePassword,
    handleLogin,
    handleForgotPassword,
    redirectToRegister,
  };
}; 