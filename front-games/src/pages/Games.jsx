import { useEffect } from "react";

function Games() {
  useEffect(() => {
    fetch("http://localhost:3000/games")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  return <h1>Jeux</h1>;
}

export default Games;
