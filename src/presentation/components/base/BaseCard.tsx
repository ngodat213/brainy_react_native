import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { useTheme } from '../../../core/theme/ThemeContext';

interface BaseCardProps extends ViewProps {
  variant?: 'elevated' | 'outlined';
}

const BaseCard: React.FC<BaseCardProps> = ({
  children,
  style,
  variant = 'elevated',
  ...props
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.card,
          borderWidth: variant === 'outlined' ? 1 : 0,
          borderColor: theme.colors.border,
          ...(variant === 'elevated' && {
            shadowColor: theme.colors.text,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }),
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 16,
  },
});

export default BaseCard; 