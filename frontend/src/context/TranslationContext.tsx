import React, { createContext, useContext, useEffect, useState } from 'react';

type TranslationContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  globalLoading: boolean;
  setGlobalLoading: (state: boolean) => void;
  globalError: string;
  setGlobalError: (message: string) => void;
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const getInitialLanguage = (): string => {
  const saved = localStorage.getItem('preferredLanguage');
  if (saved) return saved;
  const browserLang = navigator.language.split('-')[0];
  const supported = ['en', 'de', 'es', 'fr', 'pt'];
  return supported.includes(browserLang) ? browserLang : 'en';
};

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<string>(getInitialLanguage());
  const [globalLoading, setGlobalLoading] = useState<boolean>(false);
  const [globalError, setGlobalError] = useState<string>('');

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem('preferredLanguage', lang);
  };

  return (
    <TranslationContext.Provider value={{
      language,
      setLanguage,
      globalLoading,
      setGlobalLoading,
      globalError,
      setGlobalError
    }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslationContext = () => {
  const context = useContext(TranslationContext);
  if (!context) throw new Error("useTranslationContext must be used inside a TranslationProvider");
  return context;
};