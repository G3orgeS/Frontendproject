import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import '../../css/components/icons/Rating.css';

interface RatingProps {
  averageRating: number;
  showText: boolean;
  className?: string; 
}

const Rating: React.FC<RatingProps> = ({ averageRating, showText, className }) => {
  let stars;

  switch (averageRating) {
    case 1:
      stars = (
        <div className="star">
          {showText && <p>Betyg: </p>}
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
          {showText && <p>Betyg: </p>}
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
          {showText && <p>Betyg: </p>}
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
          {showText && <p>Betyg: </p>}
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
          {showText && <p>Betyg: </p>}
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
          {showText && <p>Betyg: </p>}
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
          {showText && <p>Betyg: </p>}
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
          {showText && <p>Betyg: </p>}
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
          {showText && <p>Betyg: </p>}
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
          {showText && <p>Betyg: </p>}
          <BsStarFill />
          <BsStarFill />
          <BsStarFill />
          <BsStarFill />
          <BsStarFill />
        </div>
      );
      break;
    default:
      stars = <span>{showText && 'Inget betyg tillgängligt'}</span>;
      break;
  }

  return <div className="rating">{stars}</div>;
};

export default Rating;