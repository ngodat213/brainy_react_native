import { Dimensions, Platform, StatusBar, ScaledSize } from 'react-native';
import DeviceInfo from 'react-native-device-info';

// Lấy kích thước màn hình
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Kiểm tra thiết bị
const isIOS = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';

// Chiều cao thanh trạng thái
const STATUS_BAR_HEIGHT = isIOS ? 20 : StatusBar.currentHeight || 24;

// Chiều cao thanh điều hướng (navigation bar)
const NAVIGATION_BAR_HEIGHT = isAndroid ? 48 : 0;

// Chiều cao thực tế có thể sử dụng
const AVAILABLE_HEIGHT = SCREEN_HEIGHT - STATUS_BAR_HEIGHT - NAVIGATION_BAR_HEIGHT;

// Tỷ lệ màn hình
const SCREEN_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;

// Kích thước màn hình chuẩn (iPhone 12)
const STANDARD_WIDTH = 390;
const STANDARD_HEIGHT = 844;

// Hàm lấy thông tin màn hình chi tiết
const getDeviceScreenInfo = async () => {
  const deviceId = await DeviceInfo.getDeviceId();
  const brand = await DeviceInfo.getBrand();
  const model = await DeviceInfo.getModel();
  const systemVersion = await DeviceInfo.getSystemVersion();
  const hasNotch = await DeviceInfo.hasNotch();
  const deviceType = await DeviceInfo.getDeviceType();
  const isTablet = await DeviceInfo.isTablet();
  const isLandscape = await DeviceInfo.isLandscape();

  return {
    deviceId,
    brand,
    model,
    systemVersion,
    hasNotch,
    deviceType,
    isTablet,
    isLandscape,
    screenWidth: SCREEN_WIDTH,
    screenHeight: SCREEN_HEIGHT,
    statusBarHeight: STATUS_BAR_HEIGHT,
    navigationBarHeight: NAVIGATION_BAR_HEIGHT,
    availableHeight: AVAILABLE_HEIGHT,
    screenRatio: SCREEN_RATIO,
  };
};

// Hàm scale kích thước theo chiều rộng
const scaleWidth = (size: number): number => {
  return (size * SCREEN_WIDTH) / STANDARD_WIDTH;
};

// Hàm scale kích thước theo chiều cao
const scaleHeight = (size: number): number => {
  return (size * SCREEN_HEIGHT) / STANDARD_HEIGHT;
};

// Hàm scale kích thước theo cả hai chiều
const scaleSize = (size: number): number => {
  return Math.min(scaleWidth(size), scaleHeight(size));
};

// Hàm scale font size
const scaleFont = (size: number): number => {
  return scaleSize(size);
};

// Hàm kiểm tra màn hình nhỏ
const isSmallScreen = (): boolean => {
  return SCREEN_WIDTH < 375;
};

// Hàm kiểm tra màn hình lớn
const isLargeScreen = (): boolean => {
  return SCREEN_WIDTH > 414;
};

// Hàm lấy chiều cao an toàn cho notch
const getSafeAreaHeight = (): number => {
  return isIOS ? 44 : 0;
};

// Hàm lấy chiều cao bottom safe area
const getBottomSafeArea = (): number => {
  return isIOS ? 34 : 0;
};

// Hàm lấy chiều cao thực tế có thể sử dụng (đã trừ safe areas)
const getAvailableHeight = (): number => {
  return AVAILABLE_HEIGHT - getSafeAreaHeight() - getBottomSafeArea();
};

// Hàm kiểm tra thiết bị có notch
const hasNotch = async (): Promise<boolean> => {
  return await DeviceInfo.hasNotch();
};

// Hàm lấy kích thước màn hình hiện tại
const getScreenDimensions = (): ScaledSize => {
  return Dimensions.get('window');
};

// Hàm lắng nghe thay đổi kích thước màn hình
const addScreenDimensionsListener = (callback: (dimensions: ScaledSize) => void): void => {
  Dimensions.addEventListener('change', ({ window }) => {
    callback(window);
  });
};

// Hàm xóa listener thay đổi kích thước màn hình
const removeScreenDimensionsListener = (): void => {
  // Note: Dimensions.removeEventListener is deprecated in newer versions
  // We'll keep this function for backward compatibility
};

export {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  isIOS,
  isAndroid,
  STATUS_BAR_HEIGHT,
  NAVIGATION_BAR_HEIGHT,
  AVAILABLE_HEIGHT,
  SCREEN_RATIO,
  getDeviceScreenInfo,
  scaleWidth,
  scaleHeight,
  scaleSize,
  scaleFont,
  isSmallScreen,
  isLargeScreen,
  getSafeAreaHeight,
  getBottomSafeArea,
  getAvailableHeight,
  hasNotch,
  getScreenDimensions,
  addScreenDimensionsListener,
  removeScreenDimensionsListener,
}; 