// utils/translation.js
import en from '../../public/locales/en.json';
import es from '../../public/locales/es.json';

export const getTranslations = (locale) => {
  switch (locale) {
    case 'es':
      return es;
    case 'en':
    default:
      return en;
  }
};
