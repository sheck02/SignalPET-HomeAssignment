import axios from 'axios';

export async function translateText(text, targetLang) {
  try {
    //API Limited to few characters per day
    const response = await axios.get('https://api.mymemory.translated.net/get', {
      params: {
        q: text,
        langpair: `en|${targetLang}`
      }
    });

    const translated = response.data?.responseData?.translatedText;
    return translated || text;
  } catch (error) {
  
    throw new Error('Translation API failed.');
  }
}