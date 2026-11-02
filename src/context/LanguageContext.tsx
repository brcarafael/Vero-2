import React, { createContext, useContext, useState, useEffect } from 'react';
import { content, Language } from '../data/copy';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof content.en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('vero_language');
    if (saved === 'en' || saved === 'pt' || saved === 'es') return saved;
    return 'en';
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('vero_language', lang);
  };

  const value = {
    language,
    setLanguage: handleSetLanguage,
    t: content[language] || content.en,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

