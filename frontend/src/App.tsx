import React from "react";
import { TranslationProvider, useTranslationContext } from "./context/TranslationContext";

import ReportHeader from "./components/ReportHeader";
import ReportPage from "./components/ReportPage";
import ReportSection from "./components/ReportSection";
import ReportBasicInfoSection from "./components/ReportBasicInfoSection";
import ReportAdditionalInformationSection from "./components/ReportAdditionalInformationSection";
import { additionalInformation } from "./utils/constants";
import "./App.css";
import  { Toast }  from "./components/Toast";

const styles = {
  wrapper: {
    backgroundColor: "#052e39",
    backdropFilter: "blur(2rem)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column" as const,
    gap: "2rem",
    height: "95%",
  },
  overlay: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.85)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5rem",
    zIndex: 9998,
  },
};

const AppLayout = () => {
  const { globalLoading, globalError, setGlobalError } = useTranslationContext();

  return (
    <>
      {globalLoading && <div style={styles.overlay}>🔄 Translating...</div>}
      {globalError && (
        <Toast message={globalError} onClose={() => setGlobalError("")} />
      )}

      <div style={styles.wrapper}>
        <div style={styles.container}>
          <ReportHeader />
          <ReportPage>
            <ReportBasicInfoSection />
          </ReportPage>
          <ReportPage>
            <ReportSection title={additionalInformation.title}>
              <ReportAdditionalInformationSection />
            </ReportSection>
          </ReportPage>
        </div>
      </div>
    </>
  );
};

const App = () => (
  <TranslationProvider>
    <AppLayout />
  </TranslationProvider>
);

export default App;