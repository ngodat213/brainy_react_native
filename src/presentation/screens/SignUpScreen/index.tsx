import {SafeAreaView, View} from 'react-native';
import SignUpScreenProps from './types';
import {Text} from 'react-native-gesture-handler';
import {signUpStyles} from './styles';
import {useTheme} from '../../../core/theme/ThemeContext';
import {t} from 'i18next';
import {BaseButton, BaseInput} from '../../components/base';
import { TextButton } from '../../components/Button/text_button';
import { useSignUpViewModel } from './useSignUpViewModel';
const SignUpScreen: React.FC<SignUpScreenProps> = ({}) => {
  const {theme} = useTheme();
  const {
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
  } = useSignUpViewModel();

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
        placeholder={t('auth.fullName')}
        value={fullName}
        onChangeText={setFullName}
        autoCapitalize="none"
      />
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
      <BaseButton size="small" fullWidth={true} title={t('auth.signUp')} onPress={handleSignUp} />
      <View style={signUpStyles.footer}>
        <Text style={signUpStyles.footerText}>{t('auth.alreadyHaveAccount')}</Text>
        <TextButton title={t('auth.login')} onPress={redirectToLogin} />
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
