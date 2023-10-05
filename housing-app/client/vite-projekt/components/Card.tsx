import '../css/components/Card.css';
import { House } from '../types/house';
import { Link } from 'react-router-dom';

interface CardProps {
  limit?: number;
  houses: House[]; 
  currentIndexes: number[];
  handleIndicatorClick: (index: number, imgIndex: number) => void;
}

const Card = ({ limit, currentIndexes, handleIndicatorClick, houses }: CardProps) => {
  return (
    <div className="card-grid">
      {houses.slice(0, limit).map((house: House, index: number) => (
        <Link to={`/housedetail/${house._id}`} key={house._id}>
          <div className="card">
            <div className="imgContainer">
              {house.img && house.img.length > 0 ? (
                <img
                  className='cardimg'
                  src={house.img[currentIndexes[index]]}
                  alt={house.titel}
                />
              ) : (
                <div className="no-image">No Image</div>
              )}
              <div className="carousel-indicator">
                {house.img && house.img.length > 0 && house.img.map((_: any, imgIndex: number) => (
                  <span
                    key={imgIndex}
                    className={`indicator-dot ${currentIndexes[index] === imgIndex ? 'active' : ''}`}
                    onClick={() => handleIndicatorClick(index, imgIndex)} 
                  ></span>
                ))}
              </div>
            </div>
            <div className="info">
              <div className="titel">{house.titel}</div>
              <div className="adress">{house.adress}</div>
              <div className="cost">{house.cost} kr</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

Card.defaultProps = {
  limit: 12, 
};

export default Card;
