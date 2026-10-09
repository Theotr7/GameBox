import { useState, useEffect } from "react";
import GameCard from "../components/GameCard";
import TrackingModal from "../components/TrackingModal";
import Statistics from "../components/Statistics";

function Profile() {
  const [favoriteGames, setFavoriteGames] = useState([]);
  const [trackingGames, setTrackingGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);

  const loadProfileGames = async () => {
    const favorites =
      JSON.parse(localStorage.getItem("gamebox_favorites")) || [];

    const tracking = JSON.parse(localStorage.getItem("gamebox_tracking")) || [];

    const response = await fetch("http://localhost:3000/games");
    const games = await response.json();

    const filteredGames = games.filter((game) => favorites.includes(game.id));
    setFavoriteGames(filteredGames);

    const filteredTrackingGames = games
      .filter((game) =>
        tracking.some((trackingGame) => trackingGame.gameId === game.id),
      )
      .map((game) => {
        const trackingGame = tracking.find(
          (trackingGame) => trackingGame.gameId === game.id,
        );
        return {
          ...game,
          status: trackingGame.status,
          rating: trackingGame.rating,
          review: trackingGame.review,
        };
      });
    setTrackingGames(filteredTrackingGames);
  };

  useEffect(() => {
    loadProfileGames();
  }, []);

  const incompleteGames = trackingGames.filter((game) => {
    if (game.status === "") {
      return true;
    }

    if (game.status === "completed" || game.status === "abandoned") {
      return game.rating === null || game.review.trim() === "";
    }
    return false;
  });

  const completedGames = trackingGames.filter((game) => {
    if (game.status === "") {
      return false;
    }

    if (game.status === "completed" || game.status === "abandoned") {
      return game.rating !== null && game.review.trim() !== "";
    }
    return true;
  });

  const completedCategory = completedGames.filter(
    (game) => game.status === "completed",
  );

  const inProgressCategory = completedGames.filter(
    (game) => game.status === "in-progress",
  );

  const toPlayCategory = completedGames.filter(
    (game) => game.status === "to-play",
  );

  const abandonedCategory = completedGames.filter(
    (game) => game.status === "abandoned",
  );

  const reviewedGames = trackingGames.filter((game) => {
    return (
      (game.status === "completed" || game.status === "abandoned") &&
      game.rating !== null &&
      game.review.trim() !== ""
    );
  });

  const handleFavoriteChange = (gameId, isFavorite) => {
    if (!isFavorite) {
      setFavoriteGames((games) => games.filter((game) => game.id !== gameId));
    }
  };

  const handleTrackingClick = (gameId) => {
    const game = trackingGames.find((game) => game.id === gameId);

    setSelectedGame(game);
  };

  const handleTrackingDelete = (gameId) => {
    const confirmation = window.confirm(
      "Êtes-vous sûr de vouloir retirer ce jeu de votre suivi ?",
    );

    if (!confirmation) {
      return;
    }

    const tracking = JSON.parse(localStorage.getItem("gamebox_tracking")) || [];

    const updatedTracking = tracking.filter(
      (trackingGame) => trackingGame.gameId !== gameId,
    );

    localStorage.setItem("gamebox_tracking", JSON.stringify(updatedTracking));
    loadProfileGames();
  };

  const handleCloseTrackingModal = () => {
    setSelectedGame(null);
  };

  return (
    <main className="profile">
      <h1 className="profile__title">Mon espace</h1>
      <Statistics
        trackingCount={trackingGames.length}
        completedCount={completedCategory.length}
        inProgressCount={inProgressCategory.length}
        toPlayCount={toPlayCategory.length}
        abandonedCount={abandonedCategory.length}
        averageRating={
          reviewedGames.length > 0
            ? reviewedGames.reduce((total, game) => total + game.rating, 0) /
              reviewedGames.length
            : 0
        }
      />

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
                showFavorite={true}
                onFavoriteChange={handleFavoriteChange}
              />
            ))}
          </div>
        )}
      </section>

      <section className="profile__tracking">
        <h2 className="profile__subtitle">À compléter</h2>

        {incompleteGames.length === 0 ? (
          <p className="profile__message">Vous n'avez aucun jeu à compléter.</p>
        ) : (
          <div className="profile__tracking-grid">
            {incompleteGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onClick={() => handleTrackingClick(game.id)}
                onTrackingDelete={() => handleTrackingDelete(game.id)}
              />
            ))}
          </div>
        )}
      </section>

      <section className="profile__games">
        <h2 className="profile__subtitle">Terminés</h2>
        {completedCategory.length === 0 ? (
          <p className="profile__message">Vous n'avez aucun jeu terminé.</p>
        ) : (
          <div className="profile__games-grid">
            {completedCategory.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onTrackingEdit={() => handleTrackingClick(game.id)}
                onTrackingDelete={() => handleTrackingDelete(game.id)}
              />
            ))}
          </div>
        )}
      </section>

      <section className="profile__games">
        <h2 className="profile__subtitle">En cours</h2>
        {inProgressCategory.length === 0 ? (
          <p className="profile__message">Vous n'avez aucun jeu en cours.</p>
        ) : (
          <div className="profile__games-grid">
            {inProgressCategory.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onTrackingEdit={() => handleTrackingClick(game.id)}
                onTrackingDelete={() => handleTrackingDelete(game.id)}
              />
            ))}
          </div>
        )}
      </section>

      <section className="profile__games">
        <h2 className="profile__subtitle">À jouer</h2>
        {toPlayCategory.length === 0 ? (
          <p className="profile__message">Vous n'avez aucun jeu à jouer.</p>
        ) : (
          <div className="profile__games-grid">
            {toPlayCategory.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onTrackingEdit={() => handleTrackingClick(game.id)}
                onTrackingDelete={() => handleTrackingDelete(game.id)}
              />
            ))}
          </div>
        )}
      </section>

      <section className="profile__games">
        <h2 className="profile__subtitle">Abandonnés</h2>
        {abandonedCategory.length === 0 ? (
          <p className="profile__message">Vous n'avez aucun jeu abandonnés.</p>
        ) : (
          <div className="profile__games-grid">
            {abandonedCategory.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onTrackingEdit={() => handleTrackingClick(game.id)}
                onTrackingDelete={() => handleTrackingDelete(game.id)}
              />
            ))}
          </div>
        )}
      </section>

      <section className="profile__reviews">
        <h2 className="profile__subtitle">Mes notes & avis</h2>
        {reviewedGames.length === 0 ? (
          <p className="profile__message">
            Vous n'avez pas encore de jeux notés et avec un avis.
          </p>
        ) : (
          <div className="profile__review-grid">
            {reviewedGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                showReview={true}
                onTrackingEdit={() => handleTrackingClick(game.id)}
                onTrackingDelete={() => handleTrackingDelete(game.id)}
              />
            ))}
          </div>
        )}
      </section>

      {selectedGame && (
        <TrackingModal
          game={selectedGame}
          onClose={handleCloseTrackingModal}
          onSave={loadProfileGames}
        />
      )}
    </main>
  );
}

export default Profile;
