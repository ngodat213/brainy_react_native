import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BaseButton } from './base';

const LanguageSwitch = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'vi' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <View>
      <BaseButton
        title={i18n.language === 'en' ? 'Tiếng Việt' : 'English'}
        onPress={toggleLanguage}
        variant="outline"
      />
    </View>
  );
};

export default LanguageSwitch; 