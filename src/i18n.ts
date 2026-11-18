import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import translation from './locales/en/translation.json'
import translationFr from './locales/fr/translationFr.json'
import translationEs from './locales/es/translationEs.json'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation,
    },
    fr: {
      translation: translationFr,
    },
    es: {
      translation: translationEs,
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, //react already does escaping
  },
})
export default i18n
