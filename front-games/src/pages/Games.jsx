import { useState, useEffect } from "react";
import { Link } from "react-router";
import GameCard from "../components/GameCard";
// import "../styles/components/cards.css";

const Games = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchGames = async () => {
    try {
      const response = await fetch("http://localhost:3000/games");

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();
      setGames(data);
    } catch (error) {
      setError("Impossible de récupérer les jeux");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <main className="games">
      <header className="games__header">
        <h1 className="games__title">Liste des jeux</h1>

        <Link
          className="games__create-link button button--primary"
          to="/games/add"
        >
          Ajouter un jeu
        </Link>
      </header>

      {loading ? (
        <p className="games__message">Chargement des jeux...</p>
      ) : error ? (
        <p className="games__message games__message--error">{error}</p>
      ) : games.length === 0 ? (
        <p className="games__message">Aucun jeu n’est disponible.</p>
      ) : (
        <section className="games__grid">
          {games.map((game) => (
            <GameCard game={game} />
          ))}
        </section>
      )}
    </main>
  );
};

export default Games;
