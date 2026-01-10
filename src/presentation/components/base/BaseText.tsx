import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '../../../core/theme/ThemeContext';

interface BaseTextProps extends TextProps {
  variant?: 'h1' | 'h2' | 'body';
  color?: string;
}

const BaseText: React.FC<BaseTextProps> = ({
  children,
  style,
  variant = 'body',
  color,
  ...props
}) => {
  const { theme } = useTheme();

  return (
    <Text
      style={[
        styles.text,
        theme.typography[variant],
        { color: color || theme.colors.text },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    includeFontPadding: false,
  },
});

export default BaseText; 