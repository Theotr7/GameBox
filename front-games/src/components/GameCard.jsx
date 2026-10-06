import { Link } from "react-router";

const GameCard = ({ game }) => {
  return (
    <Link className="game-card" to={`/games/${game.id}`}>
      <img
        className="game-card__image"
        src={`http://localhost:3000${game.image}`}
        alt={game.title}
      />

      <div className="game-card__content">
        <h2 className="game-card__title">{game.title}</h2>
        <p className="game-card__genre">{game.genre}</p>
        <p className="game-card__platform">{game.platform}</p>
      </div>
    </Link>
  );
};

export default GameCard;
