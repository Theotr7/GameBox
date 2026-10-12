import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/reset.css";
import "./styles/global.css";
import "./styles/components/button.css";
import "./styles/components/header.css";
import "./styles/components/game-card.css";
import "./styles/components/favorite-button.css";
import "./styles/components/tracking-modal.css";
import "./styles/components/rating.css";
import "./styles/components/statistics.css";
import "./styles/pages/home.css";
import "./styles/pages/games.css";
import "./styles/pages/game-detail.css";
import "./styles/pages/game-forms.css";
import "./styles/pages/profile.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
