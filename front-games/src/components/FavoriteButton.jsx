import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const FavoriteButton = ({ gameId, variant, onFavoriteChange }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites =
      JSON.parse(localStorage.getItem("gamebox_favorites")) || [];
    setIsFavorite(favorites.includes(gameId));
  }, [gameId]);

  const handleFavorite = () => {
    const favorites =
      JSON.parse(localStorage.getItem("gamebox_favorites")) || [];

    if (isFavorite) {
      const updatedFavorites = favorites.filter(
        (favoriteId) => favoriteId !== gameId,
      );

      localStorage.setItem(
        "gamebox_favorites",
        JSON.stringify(updatedFavorites),
      );
      setIsFavorite(false);

      if (onFavoriteChange) {
        onFavoriteChange(gameId, false);
      }
    } else {
      favorites.push(gameId);

      localStorage.setItem("gamebox_favorites", JSON.stringify(favorites));
      setIsFavorite(true);

      if (onFavoriteChange) {
        onFavoriteChange(gameId, true);
      }
    }
  };

  return (
    <button type="button" onClick={handleFavorite}>
      {variant === "icon" ? (
        isFavorite ? (
          <FaHeart />
        ) : (
          <FaRegHeart />
        )
      ) : (
        <>
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
          {isFavorite ? "Retirer de mes favoris" : "Ajouter à mes favoris"}
        </>
      )}
    </button>
  );
};

export default FavoriteButton;
