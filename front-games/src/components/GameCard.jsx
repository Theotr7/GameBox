import { Link } from "react-router";
import FavoriteButton from "./FavoriteButton";
import TrackingButton from "./TrackingButton";
import Rating from "./Rating";
import { FaPenToSquare, FaXmark } from "react-icons/fa6";

// Card réutilisable affichant les information d'un jeu
// Son contenu et ses actions s'adaptent aux propriétés reçues
const GameCard = ({
  game,
  showFavorite,
  showReview,
  onFavoriteChange,
  onTrackingChange,
  onTrackingEdit,
  onTrackingDelete,
  onClick,
}) => {
  //Contenu commun à la card et au bouton personnalisé
  const cardContent = (
    <>
      <img
        className="game-card__image"
        src={`http://localhost:3000${game.image}`}
        alt={game.title}
      />

      <div className="game-card__content">
        <h2 className="game-card__title">{game.title}</h2>
        {showReview ? (
          <div className="game-card__review">
            <Rating rating={game.rating} readOnly />
            <p className="game-card__review-text">{game.review}</p>
          </div>
        ) : (
          <>
            <p className="game-card__genre">{game.genre}</p>
            <p className="game-card__platform">{game.platform}</p>
          </>
        )}
      </div>
    </>
  );
  //Affiche les actions disponibles selon les propriétés transmises
  return (
    <div className="game-card">
      {onClick ? (
        <button className="game-card__link" type="button" onClick={onClick}>
          {cardContent}
        </button>
      ) : (
        <Link className="game-card__link" to={`/games/${game.id}`}>
          {cardContent}
        </Link>
      )}
      {showFavorite && (
        <FavoriteButton
          gameId={game.id}
          variant="icon"
          onFavoriteChange={onFavoriteChange}
        />
      )}

      {(onTrackingEdit || onTrackingDelete) && (
        <div className="game-card__actions">
          {onTrackingEdit && (
            <button
              className="game-card__action game-card__action--edit"
              type="button"
              onClick={onTrackingEdit}
            >
              <FaPenToSquare />
            </button>
          )}
          {onTrackingDelete && (
            <button
              className="game-card__action game-card__action--delete"
              type="button"
              onClick={onTrackingDelete}
            >
              <FaXmark />
            </button>
          )}
        </div>
      )}

      {onTrackingChange && (
        <TrackingButton gameId={game.id} onTrackingChange={onTrackingChange} />
      )}
    </div>
  );
};

export default GameCard;
