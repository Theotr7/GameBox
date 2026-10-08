import { FaStar, FaRegStar } from "react-icons/fa";

const Rating = ({ rating, onRatingChange }) => {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <button key={star} type="button" onClick={() => onRatingChange(star)}>
          {star <= rating ? <FaStar /> : <FaRegStar />}
        </button>
      ))}
    </div>
  );
};

export default Rating;