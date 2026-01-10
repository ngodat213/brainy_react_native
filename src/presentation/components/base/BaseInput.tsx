import React from 'react';
import {
  TextInput,
  TextInputProps,
  StyleSheet,
  View,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '../../../core/theme/ThemeContext';
import BaseText from './BaseText';
import Ionicons from 'react-native-vector-icons/Ionicons';
interface BaseInputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  prefixIcon?: string;
  suffixIcon?: string;
  onSuffixPress?: () => void;
}

const BaseInput: React.FC<BaseInputProps> = ({
  label,
  error,
  style,
  onChangeText,
  placeholder,
  prefixIcon,
  suffixIcon,
  onSuffixPress,
  containerStyle,
  ...props
}) => {
  const {theme} = useTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <BaseText
          style={[styles.label, {color: theme.colors.text}]}
          variant="body">
          {label}
        </BaseText>
      )}

      <View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: theme.colors.card,
            borderColor: error ? theme.colors.error : theme.colors.border,
          },
        ]}>
        {prefixIcon && (
          <Ionicons
            name={prefixIcon}
            size={20}
            color="#666"
            style={styles.icon}
          />
        )}

        <TextInput
          style={[styles.input, {color: theme.colors.text}, style]}
          placeholderTextColor={theme.colors.text + '80'}
          onChangeText={onChangeText}
          placeholder={placeholder}
          {...props}
        />

        {suffixIcon && (
          <TouchableOpacity onPress={onSuffixPress}>
            <Ionicons
              name={suffixIcon}
              size={20}
              color="#666"
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <BaseText
          style={[styles.error, {color: theme.colors.error}]}
          variant="body">
          {error}
        </BaseText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 36,
    backgroundColor: 'transparent',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
    paddingHorizontal: 8,
    color: '#000',
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderBottomColor: 'transparent',
  },
  icon: {
    marginRight: 8,
  },
  error: {
    marginTop: 8,
  },
});

export default BaseInput;
