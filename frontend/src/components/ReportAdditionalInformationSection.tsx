import React, { useEffect, useState } from "react";
import InputTag from "./InputTag";
import { generateXrayAnalysisSummary } from "../utils/strings";
import { translateText } from "../utils/translateText";
import { useTranslationContext } from "../context/TranslationContext";
import { TranslatableText } from "./TranslatableText";

const ReportAdditionalInformationSection: React.FC = () => {
  const [summary, setSummary] = useState("");
  const { language } = useTranslationContext();

  useEffect(() => {
    const englishSummary = generateXrayAnalysisSummary();

    translateText(englishSummary, language).then((translated) => {
      setSummary(translated);
    });
  }, [language]);

  return (
    <div>
      <span style={{ fontWeight: "bold" }}><TranslatableText text='Summary'/>:</span>
      <InputTag editable={true}>{summary}</InputTag>
    </div>
  );
};

export default ReportAdditionalInformationSection;