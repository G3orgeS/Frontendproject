import { useState, useEffect } from 'react';
import ImgWrapper from '../components/ImgWrapper';
import Filterbar from '../components/Filterbar';
import Showbtn from '../components/Showbtn';
import Card from '../components/Card';
import Loader from '../components/Loader';
import '../css/pages/Home.css';
import { House } from '../types/house';
import { getAllHouses } from '../data/houseApi';

const homepage = '../resource/Homepage.jpeg';

const Home = () => {
  const [currentIndexes, setCurrentIndexes] = useState<number[]>([]);
  const [houses, setHouses] = useState<House[]>([]);
  const [displayedCardCount, setDisplayedCardCount] = useState<number>(12);
  const [filteredHouses, setFilteredHouses] = useState<House[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);
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
    if (selectedType) {
      const filtered = houses.filter((house) => house.type === selectedType);
      setFilteredHouses(filtered);
    } else {
      setFilteredHouses(houses);
    }
  }, [selectedType, houses]);

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

  const handleFilter = (filteredHouses: House[], filters: any) => {
    if (filters.type === selectedType) {
      setSelectedType(null);
    } else {
      setSelectedType(filters.type);
    }
  };
  


  return (
    <>
      {loading && <Loader size="50px" color="#007BFF" />}
      <ImgWrapper src={homepage} alt={'bild'} />
      {/* <div className="overlay">
        <h2>Hitta din nya studentbostad</h2>
        <p>Ansök idag</p>
      </div> */}
      <Filterbar onFilter={handleFilter} houses={houses} />
      {!loading && (
        <div className="card-display">
          <Card
            houses={filteredHouses}
            currentIndexes={currentIndexes}
            handleIndicatorClick={handleIndicatorClick}
            limit={displayedCardCount}
          />
          <div className="btnwrap">
            <Showbtn onClick={handleShowMoreClick} />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
