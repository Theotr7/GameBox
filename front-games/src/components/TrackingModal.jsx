import { useState, useEffect } from "react";
import Rating from "./Rating";

const TrackingModal = ({ game, onClose, onSave }) => {
  const [status, setStatus] = useState("");
  const [rating, setRating] = useState(null);
  const [review, setReview] = useState("");

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

        <label htmlFor="game-status">Statut</label>
        <select
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

        {(status === "completed" || status === "abandoned") && (
          <>
            <label>Note</label>
            <Rating rating={rating} onRatingChange={setRating} />

            <label htmlFor="game-review">Avis</label>
            <textarea
              id="game-review"
              value={review}
              onChange={(event) => setReview(event.target.value)}
              placeholder="Écrivez votre avis..."
            />
          </>
        )}

        <button type="button" onClick={handleSave}>
          Enregistrer
        </button>
      </div>
    </div>
  );
};

export default TrackingModal;
