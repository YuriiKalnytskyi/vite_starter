import i18next from 'i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import common_en from './translations/common.en.translation.json';
import common_ua from './translations/common.ua.translation.json';
import { LANGUAGE_KEYS } from './types';

const options = {
  order: ['localStorage', 'cookie', 'navigator', 'htmlTag', 'path', 'subdomain'],
  lookupLocalStorage: 'i18nextLng'
};

const initFallbackLang = (): string => {
  const savedLang = localStorage.getItem('i18nextLng');
  const actualLang = Object.values(LANGUAGE_KEYS).find((lang) => lang === savedLang);

  if (!actualLang) localStorage.setItem('i18nextLng', LANGUAGE_KEYS.EN);

  return actualLang ?? LANGUAGE_KEYS.EN;
};

i18next
  .use(initReactI18next)
  .use(I18nextBrowserLanguageDetector)
  .init({
    detection: options,
    resources: {
      en: {
        translation: {
          common: common_en
        }
      },
      ua: {
        translation: {
          common: common_ua
        }
      }
    },
    fallbackLng: initFallbackLang(),
    interpolation: {
      escapeValue: false
    }
  });
i18next.on('languageChanged', (lng) => {
  localStorage.setItem('i18nextLng', lng);
});

export default i18next;
