import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
// import "../styles/components/forms.css";

const GameForm = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [developer, setDeveloper] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [platform, setPlatform] = useState("");
  const [image, setImage] = useState("");
  const [banner, setBanner] = useState("");
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    genre: "",
    developer: "",
    releaseDate: "",
    platform: "",
    image: "",
    banner: "",
  });

  const validateField = (field, value) => {
    if (value.trim() === "") {
      setErrors((errors) => ({
        ...errors,
        [field]: "Ce champ est obligatoire",
      }));
    } else {
      setErrors((errors) => ({
        ...errors,
        [field]: "",
      }));
    }
  };

  const isEdit = Boolean(id);

  const fetchGame = async () => {
    const response = await fetch(`http://localhost:3000/games/${id}`);
    const data = await response.json();
    setTitle(data.title);
    setDescription(data.description);
    setGenre(data.genre);
    setDeveloper(data.developer);
    setReleaseDate(data.releaseDate.split("T")[0]);
    setPlatform(data.platform);
    setImage(data.image);
    setBanner(data.banner);
  };

  useEffect(() => {
    if (isEdit) {
      fetchGame();
    }
  }, [id, isEdit]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const fields = {
      title,
      description,
      genre,
      developer,
      releaseDate,
      platform,
      image,
      banner,
    };

    const newErrors = {};

    Object.entries(fields).forEach(([field, value]) => {
      newErrors[field] = value.trim() === "" ? "Ce champ est obligatoire" : "";
    });

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    if (hasErrors) return;

    const response = await fetch(
      isEdit
        ? `http://localhost:3000/games/${id}`
        : "http://localhost:3000/games",
      {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          genre,
          developer,
          releaseDate,
          platform,
          image,
          banner,
        }),
      },
    );

    if (response.ok) {
      if (isEdit) {
        navigate(`/games/${id}`);
      } else {
        navigate("/games");
      }
    }
  };

  return (
    <main className="game-form">
      <h1 className="game-form__title">
        {isEdit ? "Modifier le jeu" : "Ajouter le jeu"}
      </h1>

      <form className="game-form__form" onSubmit={handleSubmit} noValidate>
        <div className="game-form__field">
          <label className="game-form__label" htmlFor="title">
            Titre
          </label>

          <input
            className="game-form__input"
            type="text"
            id="title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              validateField("title", event.target.value);
            }}
            required
          />
          {errors.title && <p className="game-form__error">{errors.title}</p>}
        </div>

        <div className="game-form__field">
          <label className="game-form__label" htmlFor="description">
            Description
          </label>

          <textarea
            className="game-form__textarea"
            id="description"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
              validateField("description", event.target.value);
            }}
            required
          />
          {errors.description && (
            <p className="game-form__error">{errors.description}</p>
          )}
        </div>

        <div className="game-form__field">
          <label className="game-form__label" htmlFor="genre">
            Genre
          </label>

          <input
            className="game-form__input"
            type="text"
            id="genre"
            value={genre}
            onChange={(event) => {
              setGenre(event.target.value);
              validateField("genre", event.target.value);
            }}
            required
          />
          {errors.genre && <p className="game-form__error">{errors.genre}</p>}
        </div>

        <div className="game-form__field">
          <label className="game-form__label" htmlFor="developer">
            Studio de développement
          </label>

          <input
            className="game-form__input"
            type="text"
            id="developer"
            value={developer}
            onChange={(event) => {
              setDeveloper(event.target.value);
              validateField("developer", event.target.value);
            }}
            required
          />
          {errors.developer && (
            <p className="game-form__error">{errors.developer}</p>
          )}
        </div>

        <div className="game-form__field">
          <label className="game-form__label" htmlFor="releaseDate">
            Date de sortie
          </label>

          <input
            className="game-form__input"
            type="date"
            id="releaseDate"
            value={releaseDate}
            onChange={(event) => {
              setReleaseDate(event.target.value);
              validateField("releaseDate", event.target.value);
            }}
            required
          />
          {errors.releaseDate && (
            <p className="game-form__error">{errors.releaseDate}</p>
          )}
        </div>

        <div className="game-form__field">
          <label className="game-form__label" htmlFor="platform">
            Plateformes
          </label>

          <input
            className="game-form__input"
            type="text"
            id="platform"
            value={platform}
            onChange={(event) => {
              setPlatform(event.target.value);
              validateField("platform", event.target.value);
            }}
            required
          />
          {errors.platform && (
            <p className="game-form__error">{errors.platform}</p>
          )}
        </div>

        <div className="game-form__field">
          <label className="game-form__label" htmlFor="image">
            Chemin de l’image
          </label>

          <input
            className="game-form__input"
            type="text"
            id="image"
            value={image}
            onChange={(event) => {
              setImage(event.target.value);
              validateField("image", event.target.value);
            }}
            placeholder="/images/nom-du-jeu.jpg"
          />
          {errors.image && <p className="game-form__error">{errors.image}</p>}
        </div>

        <div className="game-form__field">
          <label className="game-form__label" htmlFor="banner">
            Chemin de la bannière
          </label>

          <input
            className="game-form__input"
            type="text"
            id="banner"
            value={banner}
            onChange={(event) => {
              setBanner(event.target.value);
              validateField("banner", event.target.value);
            }}
            placeholder="/images/banner-nom-du-jeu.jpg"
          />
          {errors.banner && <p className="game-form__error">{errors.banner}</p>}
        </div>

        <div className="game-form__actions">
          <Link className="button button--secondary" to="/games">
            Annuler
          </Link>

          <button className="button button--primary" type="submit">
            {isEdit ? "Enregistrer" : "Ajouter"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default GameForm;
