import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

import en from '../translations/en.json';
import hr from '../translations/hr.json';

const resources = {
  en: { translation: en },
  hr: { translation: hr },
};

const LANGUAGE_KEY = 'land-calc-language';

const getSavedLanguage = (): string => {
  try {
    const saved = localStorage.getItem(LANGUAGE_KEY);
    if (saved && (saved === 'en' || saved === 'hr')) {
      return saved;
    }
  } catch {
    // localStorage not available
  }
  return navigator.language.split(/[-_]/)[0] || 'en';
};

i18n
  .use(resourcesToBackend(resources))
  .use(initReactI18next)
  .init({
    lng: getSavedLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

i18n.on('languageChanged', (lng) => {
  try {
    localStorage.setItem(LANGUAGE_KEY, lng);
  } catch {
    // localStorage not available
  }
});

export default i18n;