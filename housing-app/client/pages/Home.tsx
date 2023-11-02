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

  // Gör så att filtermodalen filtrerar ut och fungerar.
  const handleFilter = (filteredHouses: House[]) => {
    setFilteredHouses(filteredHouses);
  };
  /*
  Gör så att filterbaren fungerar och filtrerar ut boenden.
  gör även så att filtermodalen ej fungerar

  const handleFilter = (filteredHouses: House[], filterType: string) => {
    if (filterType === selectedType) {
      setSelectedType(null);
    } else {
      setSelectedType(filterType);
    }
  };
  */

  return (
    <>
      <ImgWrapper src={homepage} alt={'bild'} />
      <Filterbar onFilter={handleFilter} houses={houses} />
      {loading && <Loader/>}
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

