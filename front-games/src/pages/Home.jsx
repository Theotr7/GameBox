import { useState, useEffect } from "react";
import { Link } from "react-router";
import GameCard from "../components/GameCard";

//Page d'accueil présentant les jeux récents, à découvrir
// et l'espace personnel
function Home() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //Récupère la liste des jeux de l'API et gère le chargement
  const fetchGames = async () => {
    try {
      const response = await fetch("http://localhost:3000/games");

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();
      setGames(data);
    } catch (error) {
      setError("Impossible de récupérer les jeux");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  //Trie les jeux par date de sortie décroissante
  const recentGames = [...games]
    .sort((a, b) => b.releaseDate.localeCompare(a.releaseDate))
    .slice(0, 5);

  //Sélectionne 5 jeux aléatoirement
  const discoverGames = [...games].sort(() => Math.random() - 0.5).slice(0, 5);

  return (
    <main className="home">
      <section className="home__hero">
        <div className="home__hero-content">
          <h1 className="home__hero-title">
            Votre prochaine aventure commence ici !
          </h1>
          <p className="home__description">
            Découvrez de nouveaux jeux, suivez votre progression et partagez vos
            avis sur GameBox.
          </p>
          <Link to="/games" className="home__button">
            Explorez les jeux
          </Link>
        </div>
      </section>

      <section className="home__recent">
        <div className="home__container">
          <h2 className="home__recent-title">Sorties récentes</h2>
          {loading ? (
            <p className="home__message">Chargement des jeux...</p>
          ) : error ? (
            <p className="home__message home__message--error">{error}</p>
          ) : games.length === 0 ? (
            <p className="home__message">Aucun jeu n’est disponible.</p>
          ) : (
            <div className="home__games-grid">
              {recentGames.map((game) => (
                <GameCard key={game.id} game={game} showFavorite={true} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="home__discover">
        <div className="home__container">
          <h2 className="home__discover-title">À découvrir</h2>
          {loading ? (
            <p className="home__message">Chargement des jeux...</p>
          ) : error ? (
            <p className="home__message home__message--error">{error}</p>
          ) : games.length === 0 ? (
            <p className="home__message">Aucun jeu n’est disponible.</p>
          ) : (
            <div className="home__games-grid">
              {discoverGames.map((game) => (
                <GameCard key={game.id} game={game} showFavorite={true} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="home__tracking">
        <div className="home__container">
          <div className="home__tracking-content">
            <h2 className="home__tracking-title">
              Gardez une trace de vos aventures
            </h2>
            <p className="home__tracking-description">
              Ajoutez vos jeux à votre bibliothèque personnelle, suivez votre
              progression, attribuez des notes et partagez vos avis. Retrouvez
              également toutes vos statistiques dans votre espace personnel.
            </p>
            <Link to="/profile" className="home__button">
              Découvrir mon espace
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
