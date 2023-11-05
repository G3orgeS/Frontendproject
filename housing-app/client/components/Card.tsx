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
                <img className='cardimg' src={house.img[currentIndexes[index]]} alt={house.titel} />
              ) : (
                <div className="no-image">No Image</div>
              )}
              <div className="carousel-indicator" 
              onClick={(e) => { 
                e.preventDefault() 
                e.stopPropagation() }}>
                {house.img && house.img.length > 0 && house.img.map((_: any, imgIndex: number) => (
                  <span key={imgIndex} className={`indicator-dot ${currentIndexes[index] === imgIndex ? 'active' : ''}`} onClick={(e) => { handleIndicatorClick(index, imgIndex) }}></span>
                ))}
              </div>
            </div>
            <div className="informationwrapper">
              <div className="info">
                <div id='cardadress' className="adress">{house.adress}</div>
                <div className="cost">{house.cost}kr/mån</div>
                <div className="room">{house.numberOfRooms} RoK</div>
              </div>
              <div className="info2">
                <div className="city">{house.city}</div>
                <div className='landlord'>Brf {house.landlord[0]}</div>
                <div className="size">{house.size}kvm</div>
              </div>
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