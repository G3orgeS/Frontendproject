import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import '../css/pages/AcceptOffer.css';
import { House } from '../types/house';
import { getHouseById } from "../data/houseApi";
import Loader from "../components/global/Loader";
import TermsAndConditions from "../components/TermsAndConditions";

const AcceptOffer = () => {
  const { username, houseId } = useParams<{ username: string, houseId: string }>();
  const [house, setHouse] = useState<House | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (houseId) {
          const selectedHouse = await getHouseById(houseId);
          setHouse(selectedHouse);
          console.log(selectedHouse);
        }
      } catch (error) {
        console.error("Ett fel uppstod: ", error);
      }
    };
    setLoading(false);
    fetchData();
  }, [houseId]);

  if (house) { 
    return (
      <div className="AOapplycontainer">
        {loading && <Loader/>}
        <h2 className="house-title">Grattis {username}!</h2>
        <p>Din ansökan har blivit godkänd</p>
        <div className="acceptofferfullerhouse">
          <div className="aofullhousewrapperapply">
            <div className="aohousecardapplyinfo">
              <div className="house-image">
                <img src={house.img[0]} alt={house.titel} />
              </div>
              <div className="acceptofferoverview">
              <div className="papplywrap">
                  <p>{house.titel}</p>
                </div>
                <div className="papplywrap">
                  <p>{house.adress}, {house.zipcode}</p>
                </div>
                <div className="papplywrap">
                  <p>Hyresvärd: {house.landlord[0]}</p>
                </div>
              </div>
            </div>
            <div className='aoapplicationbodywrapper'>
            <TermsAndConditions />
            <div className="aobtnwrap">
              <div className="aocheckboxwrapperapply">
                <button className='applybtnno' onClick={handleDecline}>Tacka nej</button>
                <button className='applybtn' onClick={handlePayment}>Till betalning</button>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <p>Ingen bostadsinformation hittades.</p>
      </div>
    );
  }

  function handleDecline() {
    navigate(`/userapplication/${username}`);
  }

  function handlePayment() {
    navigate(`/payment/${username}/${houseId}`);
  }
}

export default AcceptOffer;
