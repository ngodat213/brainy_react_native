import React from 'react';
import {
  TextInput,
  TextInputProps,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../../core/theme/ThemeContext';
import BaseText from './BaseText';

interface BaseInputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

const BaseInput: React.FC<BaseInputProps> = ({
  label,
  error,
  style,
  containerStyle,
  ...props
}) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <BaseText
          style={[styles.label, { color: theme.colors.text }]}
          variant="body"
        >
          {label}
        </BaseText>
      )}
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.colors.card,
            borderColor: error ? theme.colors.error : theme.colors.border,
            color: theme.colors.text,
          },
          style,
        ]}
        placeholderTextColor={theme.colors.text + '80'}
        {...props}
      />
      {error && (
        <BaseText
          style={[styles.error, { color: theme.colors.error }]}
          variant="body"
        >
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
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  error: {
    marginTop: 8,
  },
});

export default BaseInput; 