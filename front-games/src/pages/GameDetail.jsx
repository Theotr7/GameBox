import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";
import FavoriteButton from "../components/FavoriteButton";
import TrackingButton from "../components/TrackingButton";
// import "../styles/components/detail.css";

const GameDetail = () => {
  const { id } = useParams();

  const [game, setGame] = useState(null);

  const navigate = useNavigate();

  //Confimation pour supprimer + méthode pour supprimer
  const handleDelete = async () => {
    const confirmation = window.confirm(
      "Êtes-vous sur de vouloir supprimer ce jeu ?",
    );
    if (!confirmation) {
      return;
    }

    const response = await fetch(`http://localhost:3000/games/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      navigate("/games");
    }
  };

  const fetchGame = async () => {
    const response = await fetch(`http://localhost:3000/games/${id}`);
    const data = await response.json();
    setGame(data);
  };

  useEffect(() => {
    fetchGame();
  }, [id]);

  if (!game) {
    return <p>Chargement...</p>;
  }

  return (
    <main className="game-detail">
      <h1 className="game-detail__heading">Détail du jeu</h1>

      <article className="game-detail__card">
        <img
          className="game-detail__image"
          src={`http://localhost:3000${game.image}`}
          alt={game.title}
        />

        <div className="game-detail__content">
          <h2 className="game-detail__title">{game.title}</h2>

          <div className="game-detail__metadata">
            <p className="game-detail__text">Genre : {game.genre}</p>

            <p className="game-detail__text">
              Studio de développement : {game.developer}
            </p>

            <p className="game-detail__text">
              Date de sortie :{" "}
              {new Date(game.releaseDate).toLocaleDateString("fr-FR")}
            </p>

            <p className="game-detail__text">
              Disponible sur : {game.platform}
            </p>
          </div>

          <div className="game-detail__description">
            <h3 className="game-detail__subtitle">Description</h3>
            <p className="game-detail__text">{game.description}</p>
          </div>

          <div className="game-detail__actions">
            <TrackingButton gameId={game.id} />
            <FavoriteButton gameId={game.id} variant="text" />

            <Link
              className="button button--secondary"
              to={`/games/${game.id}/edit`}
            >
              Modifier
            </Link>

            <button
              className="button button--danger"
              type="button"
              onClick={handleDelete}
            >
              Supprimer
            </button>

            <Link className="button button--secondary" to="/games">
              Retour aux jeux
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
};

export default GameDetail;
