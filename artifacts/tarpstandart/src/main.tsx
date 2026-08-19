import { createRoot } from "react-dom/client";
import { setBaseUrl } from "@workspace/api-client-react";
import App from "./App";
import "./index.css";

/** На Pages бэкенда нет — форма ходит на отдельный API, если задан VITE_API_URL. */
const apiUrl = import.meta.env.VITE_API_URL?.trim();
if (apiUrl) {
  setBaseUrl(apiUrl.replace(/\/+$/, ""));
}

createRoot(document.getElementById("root")!).render(<App />);
