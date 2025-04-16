import {SafeAreaView, View} from 'react-native';
import SignUpScreenProps from './types';
import {Text, TextInput} from 'react-native-gesture-handler';
import {signUpStyles} from './styles';
import {useTheme} from '../../../core/theme/ThemeContext';
import {t} from 'i18next';
import {BaseButton, BaseInput} from '../../components/base';
import {useState} from 'react';
import { TextButton } from '../../components/Button/text_button';
const SignUpScreen: React.FC<SignUpScreenProps> = ({}) => {
  const {theme} = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <SafeAreaView style={signUpStyles.container}>
      <View style={signUpStyles.header}>
        <Text
          style={{
            color: theme.colors.text,
            ...theme.typography.h2,
          }}>
          {t('auth.createAccount')}
        </Text>
        <Text
          style={{
            color: theme.colors.text,
            ...theme.typography.body,
          }}>
          {t('auth.loginToContinue')}
        </Text>
      </View>
      <BaseInput
        placeholder={t('auth.username')}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <BaseInput
        placeholder={t('auth.email')}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <BaseInput
        placeholder={t('auth.password')}
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
      />
      <BaseInput
        placeholder={t('auth.confirmPassword')}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        autoCapitalize="none"
      />
      <BaseButton size="small" title={t('auth.signUp')} onPress={() => {}} />
      <View style={signUpStyles.footer}>
        <Text style={signUpStyles.footerText}>{t('auth.alreadyHaveAccount')}</Text>
        <TextButton title={t('auth.login')} onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
