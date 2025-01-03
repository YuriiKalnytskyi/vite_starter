import i18next from 'i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import auth_en from '@/module/auth/translations/auth.en.translation.json';
import home_en from '@/module/home/translations/home.en.translation.json';
import landing_en from '@/module/landing/translations/landing.en.translation.json';
import payment_en from '@/module/payment/translations/payment.en.translation.json';
import catalog_en from '@/module/shopping-cart/translations/shopping-cart.en.translation.json';
import status_page_en from '@/module/status-page/translations/status-page.en.translation.json';

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
                    common: common_en,
                    auth: auth_en,
                    landing: landing_en,
                    home: home_en,
                    catalog: catalog_en,
                    payment: payment_en,
                    status_page: status_page_en
                }
            },
            ua: {
                translation: {
                    common: common_ua,
                    auth: auth_en,
                    landing: landing_en,
                    home: home_en,
                    catalog: catalog_en,
                    payment: payment_en,
                    status_page: status_page_en
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
