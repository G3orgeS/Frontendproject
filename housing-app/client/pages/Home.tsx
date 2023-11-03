import { useState, useEffect } from 'react';
import ImgWrapper from '../components/ImgWrapper';
import Filterbar from '../components/Filterbar';
import Card from '../components/Card';
import Loader from '../components/Loader';
import '../css/pages/Home.css';
import { House } from '../types/house';
import { getAllHouses } from '../data/houseApi';
import Button from '../components/Button';

const homepage = '../resource/Homepage.jpeg';

const Home = () => {
  const [currentIndexes, setCurrentIndexes] = useState<number[]>([]);
  const [houses, setHouses] = useState<House[]>([]);
  const [displayedCardCount, setDisplayedCardCount] = useState<number>(12);
  const [filteredHouses, setFilteredHouses] = useState<House[]>([]);
  const [filterType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  async function fetchHouses() {
    try {
      const allHouses = await getAllHouses();
      setHouses(allHouses);
      setCurrentIndexes(Array(allHouses.length).fill(0));
      setLoading(false);
    } catch (error) {
      console.error('Något gick fel vid hämtning av hus:', error);
    }
  }
  fetchHouses();
}, []);

useEffect(() => {
  if (filterType) {
    const filtered = houses.filter((house) => house.type === filterType);
    setFilteredHouses(filtered);
  } else {
    setFilteredHouses(houses);
    }
}, [filterType, houses]);

const handleIndicatorClick = (index: number, imgIndex: number) => {
  setCurrentIndexes((prevIndexes) => {
    const updatedIndexes = [...prevIndexes];
    updatedIndexes[index] = imgIndex;
    return updatedIndexes;
  });
};

const handleShowMoreClick = () => {
  setDisplayedCardCount(displayedCardCount + 12);
};

const handleFilter = (filteredHouses: House[]) => {
  setLoading(true); 
  setTimeout(() => {
    setFilteredHouses(filteredHouses);
    setLoading(false);
  }, 1000); 
};

return (
<>
  <ImgWrapper src={homepage} alt={'bild'} />
    <Filterbar onFilter={handleFilter} houses={houses} />
      {loading && <Loader />} {!loading && (
        <div className="card-display">
          <Card houses={filteredHouses} currentIndexes={currentIndexes} handleIndicatorClick={handleIndicatorClick} limit={displayedCardCount}/>
            <Button onClick={handleShowMoreClick}>Visa fler</Button>
        </div>
      )}
</>
);
};

export default Home;