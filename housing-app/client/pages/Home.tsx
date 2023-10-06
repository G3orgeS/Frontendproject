import { useState, useEffect } from 'react';
import ImgWrapper from '../components/ImgWrapper';
import Filterbar from '../components/Filterbar';
import '../css/pages/Home.css';
import Card from '../components/Card';
import { House } from '../types/house';
import { houseApi } from '../api/houseApi';
import Showbtn from '../components/Showbtn';

const homepage = '../resource/Homepage.jpeg';

const Home = () => {
  const [currentIndexes, setCurrentIndexes] = useState<number[]>([]);
  const [houses, setHouses] = useState<House[]>([]);
  const [displayedCardCount, setDisplayedCardCount] = useState<number>(12); // Antal kort som visas

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

  return (
    <>
      <ImgWrapper src={homepage} alt={'bild'} />
      <Filterbar />
      <div className="card-display">
        <Card
          houses={houses}
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


