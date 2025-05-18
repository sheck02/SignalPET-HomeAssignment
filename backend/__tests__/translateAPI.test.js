const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.json());

app.post("/api/translate", (req, res) => {
  const { text, targetLang } = req.body;

  if (!text || !targetLang) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  if (targetLang === "invalid") {
    return res.status(200).json({ translatedText: text });
  }

  return res.status(200).json({
    translatedText: `[${targetLang}] ${text}`,
  });
});

describe("POST /api/translate", () => {
  it("returns translated text", async () => {
    const res = await request(app).post("/api/translate").send({
      text: "Hello",
      targetLang: "es",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.translatedText).toBe("[es] Hello");
  });

  it("returns original text if language is invalid", async () => {
    const res = await request(app).post("/api/translate").send({
      text: "Hello",
      targetLang: "invalid",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.translatedText).toBe("Hello");
  });
});