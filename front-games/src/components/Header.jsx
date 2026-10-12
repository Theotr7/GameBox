import { Link } from "react-router";

const Header = () => {
  return (
    <header className="header">
      <Link className="header__logo" to="/">
        <img className="header__logo-image" src="/images/gamebox-logo.png" alt="" />
        <span>GameBox</span>
      </Link>
      <nav className="header__navigation">
        <Link className="header__link" to="/">
          Accueil
        </Link>

        <Link className="header__link" to="/games">
          Jeux
        </Link>

        <Link className="header__link" to="/profile">
          Mon espace
        </Link>
      </nav>
    </header>
  );
};

export default Header;
