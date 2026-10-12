import { FaStar } from "react-icons/fa";

//Affiche les statistiques de l'espace personnel
//Les valeurs sont calculées dans Profile et transmises via les props
const Statistics = ({
  trackingCount,
  completedCount,
  inProgressCount,
  toPlayCount,
  abandonedCount,
  averageRating,
}) => {
  return (
    <section className="statistics">
      <h2 className="statistics__title">Mes statistiques des jeux suivis</h2>

      <div className="statistics__grid">
        <div className="statistics__card">
          <p className="statistics__label">Suivis</p>
          <p className="statistics__value">{trackingCount}</p>
        </div>

        <div className="statistics__card">
          <p className="statistics__label">Terminés</p>
          <p className="statistics__value">{completedCount}</p>
        </div>

        <div className="statistics__card">
          <p className="statistics__label">En cours</p>
          <p className="statistics__value">{inProgressCount}</p>
        </div>

        <div className="statistics__card">
          <p className="statistics__label">À jouer</p>
          <p className="statistics__value">{toPlayCount}</p>
        </div>

        <div className="statistics__card">
          <p className="statistics__label">Abandonnés</p>
          <p className="statistics__value">{abandonedCount}</p>
        </div>

        <div className="statistics__card">
          <p className="statistics__label">Note globale</p>
          <p className="statistics__value statistics__value--rating">
            {averageRating.toFixed(1)}
            <FaStar />
          </p>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
