import { Link } from "react-router";

const Header = () => {
  return (
    <header className="header">
      <div className="header__navigation">
        <Link className="header__link" to="/">
          Accueil
        </Link>

        <Link className="header__link" to="/games">
          Jeux
        </Link>

        <Link className="header__link" to="/profile">
          Mon espace
        </Link>
      </div>
    </header>
  );
};

export default Header;
