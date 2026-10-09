import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/reset.css";
import "./styles/global.css";
import "./styles/components/button.css"
import "./styles/components/header.css";
import "./styles/components/game-card.css";
import "./styles/components/favorite-button.css";
import "./styles/pages/games.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
