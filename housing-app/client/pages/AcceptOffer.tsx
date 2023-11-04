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
      <div className="applycontainer">
        {loading && <Loader/>}
        <h2 className="house-title">{house.titel}</h2>
        <div className="fullerhouse">
          <div className="fullhousewrapperapply">
            <div className="housecardapplyinfo">
              <div className="house-image">
                <img src={house.img[0]} alt={house.titel} />
              </div>
              <div className="overview">
                <h3>Översikt</h3>
                <div className="papplywrap">
                  <p>hyra:</p>
                  <p>{house.size}kr/mån</p>
                </div>
                <div className="papplywrap">
                  <p>Stad:</p>
                  <p>{house.adress}</p>
                </div>
                <div className="papplywrap">
                  <p>Våning: </p>
                  <p>{house.landlord}</p>
                </div>
              </div>
            </div>
            <div className='applicationbodywrapper'>
            <TermsAndConditions />
            </div>
            <div className="checkapplyer">
              <div className="checkboxwrapperapply">
                <button className='applybtnno' onClick={handleDecline}>Tacka nej</button>
                <button className='applybtn' onClick={handlePayment}>Till betalning</button>
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
