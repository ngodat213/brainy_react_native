import React, { useState } from 'react'
import { SafeAreaView, Text, View, TextInput } from 'react-native'
import { useTranslation } from 'react-i18next'
import { styles } from './styles'
import { Button } from '../../components/Button/button'
import { useNavigation } from '@react-navigation/native'
import { loginThunk } from '../../store/auth/authThunks'
import { selectAuthLoading, selectAuthError } from '../../store/auth/authSelectors'
import { NavigationProps } from '../../../app/navigation/AppNavigator'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { LoginScreenProps } from './types'

const LoginScreen = () => {
  const dispatch = useAppDispatch()
  const navigation = useNavigation<NavigationProps>()
  const loading = useAppSelector(selectAuthLoading)
  const error = useAppSelector(selectAuthError)
  const { t } = useTranslation()
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      await dispatch(loginThunk({ username, password })).unwrap()
      navigation.navigate('HomeScreen')
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeText}>{t('auth.welcome')}</Text>
      <Text style={styles.subtitleText}>{t('auth.loginToContinue')}</Text>
      
      <TextInput
        style={styles.input}
        placeholder={t('auth.username')}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder={t('auth.password')}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <Button 
        title={t('auth.login')}
        onPress={handleLogin}
      />
      
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>{t('auth.dontHaveAccount')}</Text>
        <Button
          title={t('auth.signup')}
          variant="outline"
          onPress={() => navigation.navigate('SignUpScreen')}
          style={{ marginLeft: 8 }}
        />
      </View>
    </SafeAreaView>
  )
}

export default LoginScreen