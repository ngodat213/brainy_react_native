import { useState } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../../app/navigation/AppNavigator';
import { LoginUseCase } from '../../../domain/usecases/auth/loginUseCase';
import { AuthRepository } from '../../../domain/repositories/authRepository';

export const useLoginViewModel = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProps>();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Initialize use case
  const authRepository = new AuthRepository();
  const loginUseCase = new LoginUseCase(authRepository);

  const handleLogin = async () => {
    try {
      setLoading(true);
      await loginUseCase.execute({ username, password });
      navigation.navigate('HomeScreen');
    } catch (error: any) {
      const errorMessage = t(error.message || 'common.unknownError');
      Alert.alert(t('common.error'), errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const redirectToRegister = () => {
    navigation.navigate('SignUpScreen');
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPwScreen');
  };

  return {
    username,
    password,
    loading,
    setUsername,
    setPassword,
    handleLogin,
    handleForgotPassword,
    redirectToRegister,
  };
}; 