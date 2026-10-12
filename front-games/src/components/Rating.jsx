import { FaStar, FaRegStar } from "react-icons/fa";

//Affiche note sur 5 en étoiles uniquement cliquable lors de la modale de suivi
const Rating = ({ rating, onRatingChange, readOnly }) => {
  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((star) =>
        readOnly ? (
          <span className="rating__star" key={star}>
            {star <= rating ? <FaStar /> : <FaRegStar />}
          </span>
        ) : (
          <button
            className="rating__button"
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
          >
            {star <= rating ? <FaStar /> : <FaRegStar />}
          </button>
        ),
      )}
    </div>
  );
};

export default Rating;
