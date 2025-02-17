import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import WebTransportProvider from "./contexts/webtransport.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WebTransportProvider>
      <App />
    </WebTransportProvider>
  </StrictMode>,
);
