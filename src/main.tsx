import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrandingProvider } from "./contexts/BrandingContext";
import { I18nProvider } from "./contexts/I18nContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrandingProvider>
      <I18nProvider>
        <App />
      </I18nProvider>
    </BrandingProvider>
  </StrictMode>,
);
