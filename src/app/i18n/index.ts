import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en';
import vi from './locales/vi';
import EncryptedStorage from 'react-native-encrypted-storage';

const LANGUAGE_KEY = '@app_language';

// Load saved language
const loadLanguage = async () => {
  try {
    const savedLanguage = await EncryptedStorage.getItem(LANGUAGE_KEY);
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  } catch (error) {
    console.log('Error loading language:', error);
  }
};

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    vi: {
      translation: vi,
    },
  },
  lng: 'en', // default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});


// Load saved language on startup
loadLanguage();

export default i18n; 