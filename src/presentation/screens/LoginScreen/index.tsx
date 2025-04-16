import React, { useState } from 'react'
import { SafeAreaView, Text, View, TextInput, Alert } from 'react-native'
import { useTranslation } from 'react-i18next'
import { loginStyles } from './styles'
import { Button } from '../../components/Button/button'
import { useNavigation } from '@react-navigation/native'
import { loginThunk } from '../../store/auth/authThunks'
import { selectAuthLoading, selectAuthError } from '../../store/auth/authSelectors'
import { NavigationProps } from '../../../app/navigation/AppNavigator'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { TextButton } from '../../components/Button/text_button'
import { BaseButton } from '../../components/base'

const LoginScreen = () => {
  const dispatch = useAppDispatch()
  const navigation = useNavigation<NavigationProps>()
  const loading = useAppSelector(selectAuthLoading)
  const error = useAppSelector(selectAuthError)
  const { t } = useTranslation()
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    if (!username) {
      Alert.alert(t('common.error'), t('auth.pleaseEnterUsername'))
      return
    }
    if (!password) {
      Alert.alert(t('common.error'), t('auth.pleaseEnterPassword'))
      return
    }

    try {
      await dispatch(loginThunk({ username, password })).unwrap()
      if (error) {
        Alert.alert(t('common.error'), error)
      } else {
        navigation.navigate('HomeScreen')
      }
    } catch (error: any) {
      console.log('Login error:', error)
      const errorMessage = error.message?.includes('Network error') 
        ? t('common.networkError')
        : error.message || t('common.unknownError')
      Alert.alert(t('common.error'), errorMessage)
    }
  }
  
  return (
    <SafeAreaView style={loginStyles.container}>
      <View style={loginStyles.header}>
        <Text style={loginStyles.welcomeText}>{t('auth.welcome')}</Text>
        <Text style={loginStyles.subtitleText}>{t('auth.loginToContinue')}</Text>
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
        title={t('auth.login')}
        onPress={handleLogin}
        loading={loading}
      />
      
      <View style={loginStyles.signupContainer}>
        <Text style={loginStyles.signupText}>{t('auth.dontHaveAccount')}</Text>
        <TextButton
          title={t('auth.signup')}
          onPress={() => navigation.navigate('SignUpScreen')}
          style={{ marginLeft: 8 }}
        />
      </View>
    </SafeAreaView>
  )
}

export default LoginScreen