import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Traducciones
import es from './local/es/translation.json';
import en from './local/en/translation.json';

// i18next
i18n
    .use(initReactI18next)
    .init({
        resources: {
            es: {
                translation: es,
            },
            en: {
                translation: en,
            },
        },
        lng: 'es',
        fallbackLng: 'es',
        interpolation: {
            escapeValue: false,
        },
    });

export { i18n };