import { Link } from "react-router";
import FavoriteButton from "./FavoriteButton";
import TrackingButton from "./TrackingButton";
import Rating from "./Rating";
import { FaPenToSquare, FaXmark } from "react-icons/fa6";

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
          <>
            <Rating rating={game.rating} readOnly />
            <p>{game.review}</p>
          </>
        ) : (
          <>
            <p className="game-card__genre">{game.genre}</p>
            <p className="game-card__platform">{game.platform}</p>
          </>
        )}
      </div>
    </>
  );
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
      {onTrackingEdit && (
        <button type="button" onClick={onTrackingEdit}>
          <FaPenToSquare />
        </button>
      )}
      {onTrackingDelete && (
        <button type="button" onClick={onTrackingDelete}>
          <FaXmark />
        </button>
      )}

      {onTrackingChange && (
        <TrackingButton gameId={game.id} onTrackingChange={onTrackingChange} />
      )}
    </div>
  );
};

export default GameCard;
