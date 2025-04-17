import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../../app/navigation/AppNavigator";
import { AuthRepository } from "../../../domain/repositories/authRepository";
import { SignUpUseCase } from "../../../domain/usecases/auth/signUpUseCase";
import { Alert } from "react-native";
import { t } from "i18next";

export const useSignUpViewModel = () => {
  const navigation = useNavigation<NavigationProps>();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  // Initialize use case
  const authRepository = new AuthRepository();
  const signUpUseCase = new SignUpUseCase(authRepository);

  const handleSignUp = async () => {
    try {
      setLoading(true)
      await signUpUseCase.execute({full_name: fullName, username, password, email, confirmPassword})
      navigation.navigate('LoginScreen')
      Alert.alert(t('auth.signUpSuccess'), t('auth.signUpSuccessMessage'))
    } catch (error: any) {
      Alert.alert(t('common.error'), error.message)
    } finally {
      setLoading(false)
    }
  };

  const redirectToLogin = () => {
    navigation.goBack();
  };

  return {
    fullName,
    username,
    password,
    email,
    confirmPassword,
    setFullName,
    setUsername,
    setPassword,
    setEmail,
    setConfirmPassword,
    handleSignUp,
    redirectToLogin,
  };
};