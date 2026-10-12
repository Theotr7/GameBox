import { useEffect } from "react";
import { useLocation } from "react-router";

//Replace automatiquement la page en haut
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;