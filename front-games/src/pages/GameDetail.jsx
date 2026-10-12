import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { FaPenToSquare, FaTrash } from "react-icons/fa6";
import FavoriteButton from "../components/FavoriteButton";
import TrackingButton from "../components/TrackingButton";

//Page affichant les informations détaillées d'un jeu
//Permet aussi de gérer les favoris, le suivi et le CRUD
const GameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //Demande de confirmation pour supprimer jeu de l'API.
  const handleDelete = async () => {
    const confirmation = window.confirm(
      "Êtes-vous sûr de vouloir supprimer ce jeu ?",
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

  //Récupère informations du jeu sélectionné via son id
  const fetchGame = async () => {
    try {
      const response = await fetch(`http://localhost:3000/games/${id}`);

      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      setGame(data);
    } catch (error) {
      setError("Impossible de récupérer le jeu");
    } finally {
      setLoading(false);
    }
  };

  //Recharge les informations lorsqu'on consulte un autre jeu
  useEffect(() => {
    fetchGame();
  }, [id]);

  if (loading) {
    return <p className="game-detail__message">Chargement du jeu...</p>;
  }

  if (error) {
    return (
      <p className="game-detail__message game-detail__message--error">
        {error}
      </p>
    );
  }

  return (
    <main className="game-detail">
      <h1 className="game-detail__heading">Détail du jeu</h1>

      <article className="game-detail__card">
        <img
          className="game-detail__banner"
          src={`http://localhost:3000${game.banner}`}
          alt={game.title}
        />

        <div className="game-detail__content">
          <h2 className="game-detail__title">{game.title}</h2>

          <div className="game-detail__metadata">
            <p className="game-detail__text">
              <span className="game-detail__label">Genre : </span>
              {game.genre}
            </p>

            <p className="game-detail__text">
              <span className="game-detail__label">
                Studio de développement :
              </span>{" "}
              {game.developer}
            </p>

            <p className="game-detail__text">
              <span className="game-detail__label">Date de sortie :</span>{" "}
              {new Date(game.releaseDate).toLocaleDateString("fr-FR")}
            </p>

            <p className="game-detail__text">
              <span className="game-detail__label">Disponible sur :</span>{" "}
              {game.platform}
            </p>
          </div>

          <div className="game-detail__description">
            <h3 className="game-detail__subtitle">Description</h3>
            <p className="game-detail__text">{game.description}</p>
          </div>

          <div className="game-detail__actions">
            <TrackingButton gameId={game.id} />
            <FavoriteButton gameId={game.id} variant="text" />

            <Link className="button button--edit" to={`/games/${game.id}/edit`}>
              <FaPenToSquare />
              Modifier
            </Link>

            <button
              className="button button--danger"
              type="button"
              onClick={handleDelete}
            >
              <FaTrash />
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
