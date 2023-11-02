import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ImgWrapper from '../components/ImgWrapper';
import { getHouseById } from '../data/houseApi';
import '../css/pages/Confirmed.css';
import { House } from '../types/house';
import Loader from '../components/Loader';

const Confirmed = () => {
  const { houseId } = useParams<{ username: string, houseId: string }>();
  const [house, setHouse] = useState<House | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (houseId) {
          const selectedHouse = await getHouseById(houseId);
          setHouse(selectedHouse);
        }
      } catch (error) {
        console.error("Ett fel uppstod: ", error);
      }
    };
    fetchData();
    setLoading(false);
  }, [houseId]);

  return (
    <>
      <div className="confirmed-container">
      {loading && <Loader/>}
        {house && (
          <div className="confirmed-info">
            <ImgWrapper src={house.img[0]} alt="" style={{ width: '200px', height: '200px' }} />
            <div>
              <h2>{house.titel}</h2>
              <p>Adress: {house.adress}</p>
              <p>Storlek: {house.size} kvadratmeter</p>
              <p>Kostnad: {house.cost} kr/månad</p>
              <p>Rum: {house.numberOfRooms}</p>
              <p>Stad: {house.city}</p>
            </div>
          </div>
        )}
        <div className="confirmed-text">
          <h3>Grattis! Här är ditt nya boende.</h3>
          <p>
            Säkerställ noggrant att all information nedan är korrekt innan du bekräftar din bostad.
            Vi önskar dig all lycka med ditt nya boende och dina studier!
          </p>
          <Link to="/" className="button">Till startsidan</Link>
        </div>
      </div>
    </>
  );
};

export default Confirmed;

