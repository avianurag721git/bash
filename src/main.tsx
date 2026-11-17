import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { StudioProvider } from "@/context/studio";
import App from "@/App";
import "@/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StudioProvider>
      <App />
    </StudioProvider>
  </StrictMode>,
);
