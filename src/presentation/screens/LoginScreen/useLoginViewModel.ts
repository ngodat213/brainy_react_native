import { useState } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../app/navigation/AppNavigator';
import { LoginUseCase } from '../../../domain/usecases/auth/loginUseCase';
import { AuthRepository } from '../../../domain/repositories/authRepository';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const useLoginViewModel = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('ngodat213');
  const [password, setPassword] = useState('Code26102003');

  // Initialize use case
  const authRepository = new AuthRepository();
  const loginUseCase = new LoginUseCase(authRepository);

  const handleLogin = async () => {
    try {
      setLoading(true);
      await loginUseCase.execute({ username, password });
      // After successful login, navigate to Main screen
      navigation.navigate('Main');
    } catch (error: any) {
      const errorMessage = t(error.message || 'common.unknownError');
      Alert.alert(t('common.error'), errorMessage);
    } finally {
      setLoading(false);
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