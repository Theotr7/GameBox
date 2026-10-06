import { BrowserRouter, Routes, Route } from "react-router";

import Header from "./components/Header";
import Home from "./pages/Home";
import Games from "./pages/Games";
import GameDetail from "./pages/GameDetail";
import GameForm from "./pages/GameForm";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/:id" element={<GameDetail />} />
        <Route path="/games/add" element={<GameForm />} />
        <Route path="/games/:id/edit" element={<GameForm />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
