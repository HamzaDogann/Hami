import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { STORAGE_KEYS, readJSON, readString, writeString } from '../utils/storage';

const ThemeContext = createContext(null);

const getInitialTheme = () => {
  const saved = readString(STORAGE_KEYS.theme);
  if (saved === 'light' || saved === 'dark') return saved;

  // Older versions stored a boolean under "darkMode" where `true` meant the light look.
  return readJSON(STORAGE_KEYS.legacyDarkMode, false) ? 'light' : 'dark';
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    writeString(STORAGE_KEYS.theme, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  }, []);

  const value = useMemo(
    () => ({ theme, isLightTheme: theme === 'light', toggleTheme }),
    [theme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used inside <ThemeProvider>');
  return context;
};
