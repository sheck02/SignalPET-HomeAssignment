import { render, screen, waitFor } from "@testing-library/react";
import { TranslatableText } from '../src/components/TranslatableText';
import { TranslationProvider } from '../src/context/TranslationContext';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ translatedText: "Hola Mundo" }),
    })
  ) as jest.Mock;
});

describe("TranslatableText", () => {
  it("renders the original text when language is English", () => {
    render(
      <TranslationProvider>
        <TranslatableText text="Hello World" />
      </TranslationProvider>
    );

    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("renders translated text when language is not English", async () => {
    localStorage.setItem("preferredLanguage", "es");

    render(
      <TranslationProvider>
        <TranslatableText text="Hello World" />
      </TranslationProvider>
    );

    await waitFor(() =>
      expect(screen.getByText("Hola Mundo")).toBeInTheDocument()
    );
  });
});