import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, translations } from '../i18n/translations';
import { STORAGE_KEYS, readString, writeString } from '../utils/storage';

const LanguageContext = createContext(null);

const getInitialLanguage = () => {
  const saved = readString(STORAGE_KEYS.language);
  return SUPPORTED_LANGUAGES.includes(saved) ? saved : DEFAULT_LANGUAGE;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    writeString(STORAGE_KEYS.language, language);
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((current) => (current === 'en' ? 'tr' : 'en'));
  }, []);

  // t(key) returns the text in the active language; falls back to English, then to the key itself.
  const t = useCallback(
    (key) => translations[language][key] ?? translations[DEFAULT_LANGUAGE][key] ?? key,
    [language]
  );

  const value = useMemo(() => ({ language, toggleLanguage, t }), [language, toggleLanguage, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return context;
};
