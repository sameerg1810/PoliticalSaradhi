// eslint-disable-next-line import/no-extraneous-dependencies
import i18n from 'i18next';
// eslint-disable-next-line import/no-extraneous-dependencies
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en.json';
import teTranslation from './locales/te.json';
import hiTranslation from './locales/hi.json';

const resources = {
  en: {
    translation: enTranslation,
  },
  te: {
    translation: teTranslation,
  },
  hi: {
    translation: hiTranslation,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // default language
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
