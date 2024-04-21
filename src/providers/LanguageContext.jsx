import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'en'; 
  });

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'tr' : 'en'));
  };

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

const useLanguage = () => {
  const context = useContext(LanguageContext);
  return context;
};

export { LanguageProvider, useLanguage };