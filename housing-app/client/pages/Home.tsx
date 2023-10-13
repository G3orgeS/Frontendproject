import { useState, useEffect } from 'react';
import ImgWrapper from '../components/ImgWrapper';
import Filterbar from '../components/Filterbar';
import Showbtn from '../components/Showbtn';
import Card from '../components/Card';
import '../css/pages/Home.css';
import { House } from '../types/house';
import { houseApi } from '../api/houseApi';

const homepage = '../resource/Homepage.jpeg';

const Home = () => {
  const [currentIndexes, setCurrentIndexes] = useState<number[]>([]);
  const [houses, setHouses] = useState<House[]>([]);
  const [displayedCardCount, setDisplayedCardCount] = useState<number>(12);
  const [filteredHouses, setFilteredHouses] = useState<House[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHouses() {
      try {
        const allHouses = await houseApi.getAllHouses();
        setHouses(allHouses);
        setCurrentIndexes(Array(allHouses.length).fill(0));
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
    // Visa ytterligare 12 kort när "Showbtn" klickas på
    setDisplayedCardCount(displayedCardCount + 12);
  };

  const handleFilter = (type: string) => {
    if (selectedType === type) {
      // Om samma typ redan är vald, återställ filtret
      setSelectedType(null);
    } else {
      // Uppdatera den valda typen
      setSelectedType(type);
    }
  };  

  return (
    <>
      <ImgWrapper src={homepage} alt={'bild'} />
      <Filterbar onFilter={handleFilter} />
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
    </>
  );
}

export default Home;

