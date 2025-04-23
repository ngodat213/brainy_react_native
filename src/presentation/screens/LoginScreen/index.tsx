import React, {useState} from 'react';
import {SafeAreaView, Text, View, TextInput, Alert} from 'react-native';
import {useTranslation} from 'react-i18next';
import {loginStyles} from './styles';
import {TextButton} from '../../components/Button/text_button';
import {BaseButton} from '../../components/base';
import { useLoginViewModel } from './useLoginViewModel';

const LoginScreen = () => {
  const { t } = useTranslation();
  const {
    username,
    password,
    loading,
    setUsername,
    setPassword,
    handleLogin,
    handleForgotPassword,
    redirectToRegister,
  } = useLoginViewModel();

  return (
    <SafeAreaView style={loginStyles.container}>
      <View style={loginStyles.header}>
        <Text style={loginStyles.welcomeText}>{t('auth.welcome')}</Text>
        <Text style={loginStyles.subtitleText}>
          {t('auth.loginToContinue')}
        </Text>
      </View>

      <TextInput
        style={loginStyles.input}
        placeholder={t('auth.username')}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TextInput
        style={loginStyles.input}
        placeholder={t('auth.password')}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <BaseButton
        size="small"
        fullWidth={true}
        title={t('auth.login')}
        onPress={handleLogin}
        loading={loading}
      />

      <View style={loginStyles.signupContainer}>
        <Text style={loginStyles.signupText}>{t('auth.dontHaveAccount')}</Text>
        <TextButton
          title={t('auth.signup')}
          onPress={redirectToRegister}
          style={{marginLeft: 8}}
        />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
