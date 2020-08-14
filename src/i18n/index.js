import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enUS from './resources/en_us.json';
import ptBR from './resources/pt_br.json';

const resources = {
  en: enUS,
  pt: ptBR,
};

const lng = navigator.language || navigator.userLanguage;

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng,
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
