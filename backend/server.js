import express from 'express';
import cors from 'cors';
import { translateText } from './utils/translate.js';
import { getCache, saveCache, trackCost, getCost } from './utils/cache.js';

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

const SUPPORTED_LANGUAGES = ['de', 'es', 'fr', 'pt'];

app.post('/api/translate', async (req, res) => {
  const { text, targetLang } = req.body;

  if (!text || !targetLang) {
    return res.status(400).json({ error: 'Missing text or targetLang' });
  }

  if (!SUPPORTED_LANGUAGES.includes(targetLang)) {
    return res.status(400).json({ error: 'Unsupported language' });
  }

  const cached = getCache(text, targetLang);
  if (cached) {
    return res.json({ translatedText: cached, cached: true });
  }

  try {
    const translatedText = await translateText(text, targetLang);
    saveCache(text, targetLang, translatedText);
    trackCost();
    res.json({ translatedText, cached: false });
  } catch (error) {
    res.status(500).json({ error: 'Translation failed', details: error.message });
  }
});

app.get('/api/cost', (req, res) => {
  res.json(getCost());
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
