import React from 'react';
import { View, StyleSheet } from 'react-native';

const Dot = ({ isActive, color }: { isActive: boolean; color: string }) => {
  return (
    <View
      style={[
        styles.dot,
        {
          backgroundColor: isActive ? color : 'transparent',
          borderColor: color,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4, // half of width/height to make it a circle
    borderWidth: 1,
  },
});

export default Dot;