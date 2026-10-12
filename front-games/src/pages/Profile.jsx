import { useState, useEffect } from "react";
import { FaPenToSquare, FaXmark } from "react-icons/fa6";
import GameCard from "../components/GameCard";
import TrackingModal from "../components/TrackingModal";
import Statistics from "../components/Statistics";
import Rating from "../components/Rating";

//Page de l'espace personnel: gestion favoris, suivi,
// bibliothèque, statistiques, notes & avis
function Profile() {
  const [favoriteGames, setFavoriteGames] = useState([]);
  const [trackingGames, setTrackingGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  //Récupère favoris et suivis du localStorage
  //Associe données aux informations des jeux provenant de l'API
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

  //Charge données espace personnel au chargement
  useEffect(() => {
    loadProfileGames();
  }, []);

  //Sélectionne les jeux dont le suivi doit etre complété
  //Les jeux terminés ou abandonnés nécessitent une note & avis
  const incompleteGames = trackingGames.filter((game) => {
    if (game.status === "") {
      return true;
    }

    if (game.status === "completed" || game.status === "abandoned") {
      return game.rating === null || game.review.trim() === "";
    }
    return false;
  });

  //Sélectionne les jeux dont le suivi à été complété
  //Les affiches dans la bibliothèque
  const completedGames = trackingGames.filter((game) => {
    if (game.status === "") {
      return false;
    }

    if (game.status === "completed" || game.status === "abandoned") {
      return game.rating !== null && game.review.trim() !== "";
    }
    return true;
  });

  //Répartit les jeux dans la bibliothèque selon leur status
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

  //Filtre la bibliothèque selon le bouton sélectionné
  const filteredLibraryGames =
    activeFilter === "favorites"
      ? favoriteGames
      : completedGames.filter((game) => {
          if (activeFilter === "all") {
            return true;
          }

          return game.status === activeFilter;
        });

  //Récupère les jeux notés et avec un avis puis les tris
  // de la meilleure note à la moins bonne
  const reviewedGames = trackingGames
    .filter((game) => {
      return (
        (game.status === "completed" || game.status === "abandoned") &&
        game.rating !== null &&
        game.review.trim() !== ""
      );
    })
    .sort((a, b) => b.rating - a.rating);

  //Retire immédiatement un favori au click
  const handleFavoriteChange = (gameId, isFavorite) => {
    if (!isFavorite) {
      setFavoriteGames((games) => games.filter((game) => game.id !== gameId));
    }
  };

  //Ouvre la modale de suivi au click
  const handleTrackingClick = (gameId) => {
    const game = trackingGames.find((game) => game.id === gameId);

    setSelectedGame(game);
  };

  //Demande de confirmation pour supprimer un suivi du localStorage
  //puis actualise le profile
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

  //Ferme la modale de suivi en réinitialisant le jeu sélectionné
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

      <section className="profile__tracking">
        <div className="profile__heading">
          <h2 className="profile__subtitle">À compléter</h2>
          <span className="profile__count">{incompleteGames.length}</span>
        </div>

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

      <div className="profile__library">
        <h2 className="profile__library-title">Ma bibliothèque</h2>
        <div className="profile__filters">
          <button
            className={activeFilter === "all" ? "profile__filter--active" : ""}
            type="button"
            onClick={() => setActiveFilter("all")}
          >
            Tous
            <span className="profile__count">{completedGames.length}</span>
          </button>

          <button
            className={
              activeFilter === "favorites" ? "profile__filter--active" : ""
            }
            type="button"
            onClick={() => setActiveFilter("favorites")}
          >
            Favoris
            <span className="profile__count">{favoriteGames.length}</span>
          </button>

          <button
            className={
              activeFilter === "completed" ? "profile__filter--active" : ""
            }
            type="button"
            onClick={() => setActiveFilter("completed")}
          >
            Terminés
            <span className="profile__count">{completedCategory.length}</span>
          </button>

          <button
            className={
              activeFilter === "in-progress" ? "profile__filter--active" : ""
            }
            type="button"
            onClick={() => setActiveFilter("in-progress")}
          >
            En cours
            <span className="profile__count">{inProgressCategory.length}</span>
          </button>

          <button
            className={
              activeFilter === "to-play" ? "profile__filter--active" : ""
            }
            type="button"
            onClick={() => setActiveFilter("to-play")}
          >
            À jouer
            <span className="profile__count">{toPlayCategory.length}</span>
          </button>

          <button
            className={
              activeFilter === "abandoned" ? "profile__filter--active" : ""
            }
            type="button"
            onClick={() => setActiveFilter("abandoned")}
          >
            Abandonnés
            <span className="profile__count">{abandonedCategory.length}</span>
          </button>
        </div>

        {filteredLibraryGames.length === 0 ? (
          <p className="profile__message">Aucun jeu dans cette catégorie.</p>
        ) : (
          <div className="profile__games-grid">
            {filteredLibraryGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                showFavorite={activeFilter === "favorites"}
                onFavoriteChange={handleFavoriteChange}
                onTrackingEdit={
                  activeFilter !== "favorites"
                    ? () => handleTrackingClick(game.id)
                    : undefined
                }
                onTrackingDelete={
                  activeFilter !== "favorites"
                    ? () => handleTrackingDelete(game.id)
                    : undefined
                }
              />
            ))}
          </div>
        )}
      </div>

      <section className="profile__reviews">
        <div className="profile__heading">
          <h2 className="profile__subtitle">Mes notes & avis</h2>
          <span className="profile__count">{reviewedGames.length}</span>
        </div>

        {reviewedGames.length === 0 ? (
          <p className="profile__message">
            Vous n'avez pas encore de jeux notés et avec un avis.
          </p>
        ) : (
          <div className="profile__review-grid">
            {reviewedGames.map((game) => (
              <article className="profile__review-card" key={game.id}>
                <img
                  className="profile__review-image"
                  src={`http://localhost:3000${game.image}`}
                  alt={game.title}
                />

                <div className="profile__review-content">
                  <h3 className="profile__review-title">{game.title}</h3>

                  <Rating rating={game.rating} readOnly={true} />

                  <p className="profile__review-text">{game.review}</p>
                </div>

                <div className="profile__review-actions">
                  <button
                    className="profile__review-edit"
                    type="button"
                    onClick={() => handleTrackingClick(game.id)}
                  >
                    <FaPenToSquare />
                  </button>

                  <button
                    className="profile__review-delete"
                    type="button"
                    onClick={() => handleTrackingDelete(game.id)}
                  >
                    <FaXmark />
                  </button>
                </div>
              </article>
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
