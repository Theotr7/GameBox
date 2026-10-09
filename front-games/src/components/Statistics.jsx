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

      <p>Suivis : {trackingCount}</p>
      <p>Terminés : {completedCount}</p>
      <p>En cours : {inProgressCount}</p>
      <p>À jouer : {toPlayCount}</p>
      <p>Abandonnés : {abandonedCount}</p>
      <p>Note globale : {averageRating.toFixed(1)} /5</p>
    </section>
  );
};

export default Statistics;
