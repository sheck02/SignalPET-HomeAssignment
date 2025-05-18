import React from 'react';
import { useTranslationContext } from '../context/TranslationContext';

export const LanguageSelector: React.FC = () => {
  const { setLanguage } = useTranslationContext();
  return (
    <select onChange={(e) => setLanguage(e.target.value)} defaultValue={localStorage.getItem('preferredLanguage') || 'en'}>
      <option value="en">English</option>
      <option value="de">German</option>
      <option value="es">Spanish</option>
      <option value="fr">French</option>
      <option value="pt">Portuguese</option>
    </select>
  );
};