import React, { useEffect, useState } from 'react';
import { useTranslationContext } from '../context/TranslationContext';

type Props = {
  text: string;
};

export const TranslatableText: React.FC<Props> = ({ text }) => {
  const {
    language,
    setGlobalLoading,
    setGlobalError
  } = useTranslationContext();

  const [translated, setTranslated] = useState<string>(text);

  useEffect(() => {
    const translate = async () => {
      if (language === 'en') {
        setTranslated(text);
        return;
      }

      try {
        setGlobalLoading(true);
        setGlobalError('');

        const res = await fetch('http://localhost:5001/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, targetLang: language }),
        });

        const data = await res.json();

        if (res.ok) {
          setTranslated(data.translatedText); 
        } else {
          setTranslated(text);
          setGlobalError(data.error || 'Something went wrong.');
        }
      } catch (err) {
        setTranslated(text);
        setGlobalError('Could not connect to translation server.');
      } finally {
        setGlobalLoading(false);
      }
    };

    translate();
  }, [text, language]);

  return <span>{typeof translated === 'string' ? translated : String(translated)}</span>;
};