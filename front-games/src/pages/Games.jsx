import { useState, useEffect } from "react";
import { Link } from "react-router";
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
            <Link
              className="game-card"
              key={game.id}
              to={`/games/${game.id}`}
            >
              <img
                className="game-card__image"
                src={`http://localhost:3000${game.image}`}
                alt={game.title}
              />

              <div className="game-card__content">
                <h2 className="game-card__title">{game.title}</h2>

                <p className="game-card__description">{game.description}</p>

                <p className="game-card__genre">{game.genre}</p>
                <p className="game-card__platform">{game.platform}</p>
              </div>
            </Link>
          ))}
        </section>
      )}
    </main>
  );
};

export default Games;
