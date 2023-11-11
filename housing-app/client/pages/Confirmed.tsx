import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ImgWrapper from '../components/global/ImgWrapper';
import { getHouseById } from '../data/houseApi';
import '../css/pages/Confirmed.css';
import { House } from '../types/house';
import Loader from '../components/global/Loader';
import Button from '../components/global/Button';

import confimg from '../resource/confirm.jpg';

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
        console.error('Ett fel uppstod: ', error);
      }
      setLoading(false);
    };
    fetchData();
  }, [houseId]);

  return (
    <>
    <div className="confimgwrap">
      <ImgWrapper src={confimg} alt={''} />
      </div>
    <div className="confirmed-container">
      <div className="confwrapper">
      <div className="confirmed-text">
        <h3>Grattis! Här är ditt nya boende.</h3>
        <p>
          Säkerställ noggrant att all information nedan är korrekt innan du bekräftar din bostad.
          Vi önskar dig all lycka med ditt nya boende och dina studier!
        </p>
        <div className="confdeskonly">
          <Button to="/">Home</Button>
        </div>
      </div>
      <div className="confirmed-info">
        <div className="image-container">
          {house && (
            <img alt={'test'} src={house.img[0]} className="confirmed-img" />
          )}
        </div>
        {loading && <Loader />}
        {house && (
          <div className='confirmotherinfo'>
            <h2>{house.titel}</h2>
            <div className="address-landlord">
              <p>{house.adress}</p>
              <p>Hyresvärd: {house.landlord[0]}</p>
            </div>
            <div className="other-info">
              <p>{house.size}kvm</p>
              <p>{house.cost}kr/mån</p>
              <p>{house.numberOfRooms} RoK</p>
              <p>{house.city}</p>
            </div>
            <div className="other-info-mobile-only">
              <div className="info">
                <div id='mobileconfirmadress' className="adress">{house.adress}</div>
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
        )}
      </div>
      </div>
      <div className="confmobonly">
      <Button to="/">Home</Button>
      </div>
    </div>
    </>
  );
};

export default Confirmed;