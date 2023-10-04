import ImgWrapper from '../components/ImgWrapper';
import Filterbar from '../components/Filterbar';
import '../css/pages/Home.css';
import Card from '../components/Card';
import { useState, useEffect } from 'react';
import { House } from '../types/house'; // Importera House-typen
import { houseApi } from '../api/houseApi';
import Showbtn from '../components/Showbtn'

const homepage = '../resource/Homepage.jpeg';

const Home = () => {
  const [currentIndexes, setCurrentIndexes] = useState<number[]>([]);
  const [houses, setHouses] = useState<House[]>([]); // Lägg till houses här

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

  return (
    <>
      <ImgWrapper src={homepage} alt={'bild'} />
      <Filterbar />
      <div className="card-display">
      <Card
        houses={houses} // Skicka med houses till Card-komponenten
        currentIndexes={currentIndexes}
        handleIndicatorClick={handleIndicatorClick}
      />
        <div className="btnwrap">
          <Showbtn />
        </div>
      </div>
    </>
  );
}

export default Home;

