import { useCallback, useState, useEffect } from 'react';
import { BackHandler, Dimensions, ScaledSize } from 'react-native';
import { useNavigation } from '@react-navigation/native';

/**
 * Custom hook để quản lý các tương tác màn hình
 * 
 * @returns Các giá trị và hàm để xử lý tương tác màn hình
 */
export const useScreen = () => {
  const navigation = useNavigation();
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [isPortrait, setIsPortrait] = useState(
    dimensions.height > dimensions.width
  );

  // Xử lý thay đổi kích thước màn hình (xoay thiết bị)
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
      setIsPortrait(window.height > window.width);
    });

    return () => subscription.remove();
  }, []);

  // Xử lý nút back trên Android
  const handleBackPress = useCallback(
    (callback?: () => boolean) => {
      const backAction = () => {
        // Nếu có callback, thực thi nó trước
        if (callback) {
          return callback();
        }
        
        // Mặc định quay lại màn hình trước
        if (navigation.canGoBack()) {
          navigation.goBack();
          return true;
        }
        
        return false;
      };

      // Đăng ký event listener
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      );

      return () => backHandler.remove();
    },
    [navigation]
  );

  return {
    dimensions,
    isPortrait,
    width: dimensions.width,
    height: dimensions.height,
    handleBackPress,
  };
}; 