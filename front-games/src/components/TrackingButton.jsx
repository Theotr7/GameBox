import { useState, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";

const TrackingButton = ({ gameId, onTrackingChange }) => {
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    const tracking = JSON.parse(localStorage.getItem("gamebox_tracking")) || [];

    const alreadyTracking = tracking.some((game) => game.gameId === gameId);

    setIsTracking(alreadyTracking);
  }, [gameId]);

  const handleTracking = () => {
    const tracking = JSON.parse(localStorage.getItem("gamebox_tracking")) || [];

    if (isTracking) {
      const updatedTracking = tracking.filter((game) => game.gameId !== gameId);

      localStorage.setItem("gamebox_tracking", JSON.stringify(updatedTracking));
      setIsTracking(false);

      if (onTrackingChange) {
        onTrackingChange(gameId, false);
      }
    } else {
      const newTracking = {
        gameId: gameId,
        status: "",
        rating: null,
        review: "",
      };

      tracking.push(newTracking);

      localStorage.setItem("gamebox_tracking", JSON.stringify(tracking));
      setIsTracking(true);

      if (onTrackingChange) {
        onTrackingChange(gameId, true);
      }
    }
  };

  return (
    <button
      className="button button--primary"
      type="button"
      onClick={handleTracking}
    >
      {isTracking ? <FaMinus /> : <FaPlus />}
      {isTracking ? "Retirer de mon espace" : "Ajouter à mon espace"}
    </button>
  );
};

export default TrackingButton;
