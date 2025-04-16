import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  ActivityIndicator,
  FlexStyle,
} from 'react-native';
import { useTheme } from '../../../core/theme/ThemeContext';
import BaseText from './BaseText';

interface BaseButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

const BaseButton: React.FC<BaseButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  fullWidth = true,
  style,
  ...props
}) => {
  const { theme } = useTheme();

  const getButtonStyle = () => {
    const baseStyle = {
      backgroundColor:
        variant === 'outline' ? 'transparent' : theme.colors[variant as 'primary' | 'secondary'],
      borderWidth: variant === 'outline' ? 1 : 0,
      borderColor: variant === 'outline' ? theme.colors.primary : 'transparent',
      paddingVertical: theme.spacing[size === 'small' ? 'sm' : size === 'large' ? 'lg' : 'md'],
      paddingHorizontal: theme.spacing[size === 'small' ? 'md' : size === 'large' ? 'xl' : 'lg'],
      borderRadius: 8,
      opacity: disabled ? 0.5 : 1,
      alignSelf: fullWidth ? 'stretch' as const : 'auto' as const,
    };

    return [styles.button, baseStyle, style];
  };

  const getTextColor = () => {
    if (variant === 'outline') {
      return theme.colors.primary;
    }
    return '#FFFFFF';
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <BaseText
          style={[styles.text, { color: getTextColor() }]}
          variant={size === 'small' ? 'body' : 'h2'}
        >
          {title}
        </BaseText>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 64,
  },
  text: {
    textAlign: 'center',
  },
});

export default BaseButton; 