import React from 'react';
import {
  View,
  ViewStyle,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { useTheme } from '../../../core/theme/ThemeContext';

interface BaseViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
  safeArea?: boolean;
  statusBarStyle?: 'light-content' | 'dark-content';
  backgroundColor?: string;
}

const BaseView: React.FC<BaseViewProps> = ({
  children,
  style,
  safeArea = true,
  statusBarStyle = 'dark-content',
  backgroundColor,
}) => {
  const { theme } = useTheme();

  const Container = safeArea ? SafeAreaView : View;

  return (
    <>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={backgroundColor || theme.colors.background}
      />
      <Container
        style={[
          styles.container,
          { backgroundColor: backgroundColor || theme.colors.background },
          style,
        ]}
      >
        {children}
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

export default BaseView; 