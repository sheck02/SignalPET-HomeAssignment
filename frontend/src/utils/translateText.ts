
export async function translateText(text: string, targetLang: string): Promise<string> {
    if (targetLang === "en") return text;
  
    try {
      const res = await fetch("http://localhost:5001/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, targetLang }),
      });
  
      const data = await res.json();
      return res.ok ? data.translatedText : text;
    } catch {
      return text;
    }
  }