import { useState, useEffect } from "react";
import GameCard from "../components/GameCard";

function Profile() {
  const [favoriteGames, setFavoriteGames] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const favorites =
        JSON.parse(localStorage.getItem("gamebox_favorites")) || [];

      const response = await fetch("http://localhost:3000/games");
      const games = await response.json();

      const filteredGames = games.filter((game) => favorites.includes(game.id));
      setFavoriteGames(filteredGames);
    };
    loadFavorites();
  }, []);

  const handleFavoriteChange = (gameId, isFavorite) => {
    if (!isFavorite) {
      setFavoriteGames((games) => games.filter((game) => game.id !== gameId));
    }
  };

  return (
    <main className="profile">
      <h1 className="profile__title">Mon espace</h1>

      <section className="profile__favorites">
        <h2 className="profile__subtitle">Mes favoris</h2>

        {favoriteGames.length === 0 ? (
          <p className="profile__message">Vous n'avez pas encore de favoris.</p>
        ) : (
          <div className="profile__favorites-grid">
            {favoriteGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onFavoriteChange={handleFavoriteChange}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Profile;
