import { useState, useEffect } from "react";
import Rating from "./Rating";

//Modale permettant de Completer/Modifier les informations du suivi d'un jeu
const TrackingModal = ({ game, onClose, onSave }) => {
  const [status, setStatus] = useState("");
  const [rating, setRating] = useState(null);
  const [review, setReview] = useState("");

  //Récupère les informations déjà enregistrées pour completer/modifier
  useEffect(() => {
    const tracking = JSON.parse(localStorage.getItem("gamebox_tracking")) || [];

    const trackingGame = tracking.find(
      (trackingGame) => trackingGame.gameId === game.id,
    );

    if (trackingGame) {
      setStatus(trackingGame.status);
      setRating(trackingGame.rating);
      setReview(trackingGame.review);
    }
  }, [game.id]);

  //Met à jour le localStorage et ferme la fenêtre
  const handleSave = () => {
    const tracking = JSON.parse(localStorage.getItem("gamebox_tracking")) || [];

    const updatedTracking = tracking.map((trackingGame) => {
      if (trackingGame.gameId === game.id) {
        return {
          ...trackingGame,
          status,
          rating,
          review,
        };
      }
      return trackingGame;
    });
    localStorage.setItem("gamebox_tracking", JSON.stringify(updatedTracking));

    onSave();
    onClose();
  };

  return (
    <div className="tracking-modal">
      <div className="tracking-modal__content">
        <h2 className="tracking-modal__title">Modifier mon suivi</h2>
        <p className="tracking-modal__game-title">{game.title}</p>
        <div className="tracking-modal__field">
          <label className="tracking-modal__label" htmlFor="game-status">
            Statut
          </label>

          <select
            className="tracking-modal__select"
            id="game-status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value="">Choisir un statut</option>
            <option value="completed">Terminé</option>
            <option value="in-progress">En cours</option>
            <option value="to-play">À jouer</option>
            <option value="abandoned">Abandonné</option>
          </select>
        </div>

        {/*La note et l'avis sont visibles quand le status est à "terminé" ou
        "abandonné"*/}
        {(status === "completed" || status === "abandoned") && (
          <>
            <div className="tracking-modal__field">
              <span className="tracking-modal__label">Note</span>
              <Rating rating={rating} onRatingChange={setRating} />
            </div>

            <div className="tracking-modal__field">
              <label className="tracking-modal__label" htmlFor="game-review">
                Avis
              </label>
              <textarea
                className="tracking-modal__textarea"
                id="game-review"
                value={review}
                onChange={(event) => setReview(event.target.value)}
                placeholder="Écrivez votre avis..."
              />
            </div>
          </>
        )}
        <div className="tracking-modal__actions">
          <button
            className="button button--secondary"
            type="button"
            onClick={onClose}
          >
            Annuler
          </button>
          <button
            className="button button--primary"
            type="button"
            onClick={handleSave}
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackingModal;
