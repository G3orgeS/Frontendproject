import '../css/components/Card.css';
import { House } from '../types/house';
import { houseApi } from '../api/houseApi';
import { useState, useEffect } from 'react';

interface CardProps {
    limit?: number;
    houses: House[]; // Lägg till houses här
    currentIndexes: number[];
    handleIndicatorClick: (index: number, imgIndex: number) => void;
  }

const Card = ({ limit, currentIndexes, handleIndicatorClick }: CardProps) => {
  const [houses, setHouses] = useState<House[]>([]);

  useEffect(() => {
    async function fetchHouses() {
      try {
        const allHouses = await houseApi.getAllHouses();
        setHouses(allHouses);
      } catch (error) {
        console.error('Något gick fel vid hämtning av hus:', error);
      }
    }

    fetchHouses();
  }, []);

  return (
    <div className="card-grid">
      {houses.slice(0, limit).map((house, index) => (
        <div key={house._id} className="card">
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
              {house.img && house.img.length > 0 && house.img.map((_, imgIndex) => (
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
      ))}
    </div>
  );
}

Card.defaultProps = {
  limit: 12, // Om ingen gräns anges kommer 10 kort att visas som standard
};

export default Card;
