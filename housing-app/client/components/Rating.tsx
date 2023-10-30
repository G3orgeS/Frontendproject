import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import '../css/components/Rating.css'

interface RatingProps {
    averageRating: number;
  }

const Rating: React.FC<RatingProps> = ({ averageRating }) => {
  let stars;

  switch (averageRating) {
    case 1:
        stars = (
          <div className="star">
            <BsStarHalf />
            <BsStar />
            <BsStar />
            <BsStar />
            <BsStar />
          </div>
        );
        break;
    case 2:
      stars = (
        <div className="star">
          <BsStarFill />
          <BsStar />
          <BsStar />
          <BsStar />
          <BsStar />
        </div>
      );
      break;
    case 3:
      stars = (
        <div className="star">
          <BsStarFill />
          <BsStarHalf />
          <BsStar />
          <BsStar />
          <BsStar />
        </div>
      );
      break;
    case 4:
      stars = (
        <div className="star">
          <BsStarFill />
          <BsStarFill />
          <BsStar />
          <BsStar />
          <BsStar />
        </div>
      );
      break;
    case 5:
      stars = (
        <div className="star">
          <BsStarFill />
          <BsStarFill />
          <BsStarHalf />
          <BsStar />
          <BsStar />
        </div>
      );
      break;
    case 6:
      stars = (
        <div className="star">
          <BsStarFill />
          <BsStarFill />
          <BsStarFill />
          <BsStar />
          <BsStar />
        </div>
      );
      break;
    case 7:
      stars = (
        <div className="star">
          <BsStarFill />
          <BsStarFill />
          <BsStarFill />
          <BsStarHalf />
          <BsStar />
        </div>
      );
      break;
    case 8:
      stars = (
        <div className="star">
          <BsStarFill />
          <BsStarFill />
          <BsStarFill />
          <BsStarFill />
          <BsStar />
        </div>
      );
      break;
    case 9:
      stars = (
        <div className="star">
          <BsStarFill />
          <BsStarFill />
          <BsStarFill />
          <BsStarFill />
          <BsStarHalf />
        </div>
      );
      break;
    case 10:
      stars = (
        <div className="star">
          <BsStarFill />
          <BsStarFill />
          <BsStarFill />
          <BsStarFill />
          <BsStarFill />
        </div>
      );
      break;
    default:
      stars = <span>No rating available</span>;
      break;
  }

  return <div className="rating">{stars}</div>;
};

export default Rating;