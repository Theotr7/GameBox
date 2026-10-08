import { useState, useEffect } from "react";
import { Link } from "react-router";
import GameCard from "../components/GameCard";
// import "../styles/components/cards.css";

const Games = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedDeveloper, setSelectedDeveloper] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

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

  const availableGenres = [...new Set(games.map((game) => game.genre))].sort();

  const availableDevelopers = [
    ...new Set(games.map((game) => game.developer)),
  ].sort();

  const filteredGames = games.filter(
    (game) =>
      game.title.toLowerCase().includes(search.trim().toLowerCase()) &&
      (!selectedGenre || game.genre === selectedGenre) &&
      (!selectedDeveloper || game.developer === selectedDeveloper),
  );

  const sortedGames = [...filteredGames];

  if (selectedSort === "title-asc") {
    sortedGames.sort((a, b) => a.title.localeCompare(b.title));
  } else if (selectedSort === "title-desc") {
    sortedGames.sort((a, b) => b.title.localeCompare(a.title));
  }

  if (selectedSort === "date-asc") {
    sortedGames.sort((a, b) => a.releaseDate.localeCompare(b.releaseDate));
  } else if (selectedSort === "date-desc") {
    sortedGames.sort((a, b) => b.releaseDate.localeCompare(a.releaseDate));
  }

  return (
    <main className="games">
      <header className="games__header">
        <h1 className="games__title">Liste des jeux</h1>
        <Link
          className="games__create-link button button--primary"
          to="/games/add"
        >
          Ajouter un jeu
        </Link>
      </header>

      <div className="games__controls">
        <label className="games__label" htmlFor="game-search">
          Rechercher un jeu
        </label>

        <input
          className="games__search"
          id="game-search"
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Entrez le titre du jeu"
        />

        <label className="games__label" htmlFor="genre-filter">
          Sélectionner un genre
        </label>

        <select
          className="games__select"
          id="genre-filter"
          value={selectedGenre}
          onChange={(event) => setSelectedGenre(event.target.value)}
        >
          <option value="">Tous les genres</option>

          {availableGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        <label className="games__label" htmlFor="developer-filter">
          Sélectionner un studio de developpement
        </label>

        <select
          className="games__select"
          id="developer-filter"
          value={selectedDeveloper}
          onChange={(event) => setSelectedDeveloper(event.target.value)}
        >
          <option value="">Tous les studios de développement</option>

          {availableDevelopers.map((developer) => (
            <option key={developer} value={developer}>
              {developer}
            </option>
          ))}
        </select>

        <label className="games__label" htmlFor="sort-games">
          Trier les jeux
        </label>

        <select
          className="games__select"
          id="sort-games"
          value={selectedSort}
          onChange={(event) => setSelectedSort(event.target.value)}
        >
          <option value="">Aucun tri</option>
          <option value="title-asc">Titre croissant</option>
          <option value="title-desc">Titre décroissant</option>
          <option value="date-asc">Date croissante</option>
          <option value="date-desc">Date décroissante</option>
        </select>
      </div>

      {loading ? (
        <p className="games__message">Chargement des jeux...</p>
      ) : error ? (
        <p className="games__message games__message--error">{error}</p>
      ) : games.length === 0 ? (
        <p className="games__message">Aucun jeu n’est disponible.</p>
      ) : (
        <section className="games__grid">
          {sortedGames.map((game) => (
            <GameCard key={game.id} game={game} showFavorite={true} />
          ))}
        </section>
      )}
    </main>
  );
};

export default Games;
