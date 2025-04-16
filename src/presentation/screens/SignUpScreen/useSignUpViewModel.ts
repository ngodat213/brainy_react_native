import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import { useAppDispatch } from "../../store/hooks";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../../app/navigation/AppNavigator";
import { registerThunk } from "../../store/auth/authThunks";

export const useSignUpViewModel = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProps>();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (!username) {
      Alert.alert(t('common.error'), t('auth.pleaseEnterUsername'))
      return
    }
    if (!password) {
      Alert.alert(t('common.error'), t('auth.pleaseEnterPassword'))
      return
    }
    if (!email) {
      Alert.alert(t('common.error'), t('auth.pleaseEnterEmail'))
      return
    }

    if (password !== confirmPassword) {
      Alert.alert(t('common.error'), t('auth.passwordNotMatch'))
      return
    }

    try {
      await dispatch(registerThunk({fullName, username, password, email})).unwrap()
      navigation.navigate('LoginScreen')
    } catch (error: any) {
      console.log('Sign up error:', error)
    }
  };

  const redirectToLogin = () => {
    navigation.navigate('LoginScreen');
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