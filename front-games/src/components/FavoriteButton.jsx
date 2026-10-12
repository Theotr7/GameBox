import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

//Bouton ajouter/supprimer un jeu des favoris
const FavoriteButton = ({ gameId, variant, onFavoriteChange }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  //Verification si jeu déjà présent dans "gamebox_favorites" au chargement
  useEffect(() => {
    const favorites =
      JSON.parse(localStorage.getItem("gamebox_favorites")) || [];
    setIsFavorite(favorites.includes(gameId));
  }, [gameId]);

  //Ajouter/supprimer jeu des favoris au click
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
    <button
      type="button"
      className={`favorite-button ${
        variant === "icon" ? "favorite-button--icon" : "button button--primary"
      } ${isFavorite ? "favorite-button--active" : ""}`}
      onClick={handleFavorite}
    >
      {isFavorite ? <FaHeart /> : <FaRegHeart />}
      {variant !== "icon" &&
        (isFavorite ? "Retirer de mes favoris" : "Ajouter à mes favoris")}
    </button>
  );
};

export default FavoriteButton;
