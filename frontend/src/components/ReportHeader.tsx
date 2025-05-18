import React from "react";
import { reportHeader } from "../utils/constants";
import { TranslatableText } from "./TranslatableText";
import { LanguageSelector } from "./LanguageSelector";

const styles = {
  container: {
    backgroundColor: "#064c60",
    display: "flex",
    flexDirection: "row" as const,
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    width: "100%",
  },
  logo: {
    width: "10rem",
  },
  languageWrapper: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    margin: "0 1rem",
  },
  label: {
    color: "#fff",
    fontSize: "0.85rem",
    marginBottom: "0.25rem",
  },
  secondaryText: {
    color: "#fff",
  },
};

const ReportHeader = () => {
  return (
    <div style={styles.container}>
      <img
        alt="Logo"
        src={require("../static/logo.png")}
        style={styles.logo}
      />

      <div style={styles.languageWrapper}>
        <span style={styles.label}>
          <TranslatableText text="Choose your language" />
        </span>
        <LanguageSelector />
      </div>

      <span style={styles.secondaryText}>
        <TranslatableText text={reportHeader.secondaryText} />
      </span>
    </div>
  );
};

export default ReportHeader;