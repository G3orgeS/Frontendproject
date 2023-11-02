import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import '../css/pages/Application.css';
import { House } from '../types/house';
import { getHouseById } from "../data/houseApi";
import Loader from "../components/Loader";

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
              <div className='textwrap2info'>
                <p>
                  <strong>Viktiga krav och villkor från hyresföreningen:</strong>
                </p>
                <p>
                  <strong>1. Deposition:</strong> En deposition om 5 000 kr måste betalas inom 7 dagar från acceptdatumet. Denna summa återbetalas när du flyttar ut, förutsatt att bostaden lämnas i ursprungligt skick.
                </p>
                <p>
                  <strong>2. Husdjur:</strong> Husdjur är tillåtna, men en särskild avgift om 200 kr/månad tillkommer.
                </p>
                <p>
                  <strong>3. Rökning:</strong> Rökning är strikt förbjuden inom bostadens område, inklusive balkonger och gemensamma utrymmen.
                </p>
                <p>
                  <strong>4. Inflyttningsdatum:</strong> Om inflyttningsdatum infaller på en helgdag så är inflyttningsdatumet första vardagen på kommande vecka. Var god se till att koordinera med fastighetsskötaren för att undvika kollisioner.
                </p>
                <p>
                  <strong>5. Uppsägningstid:</strong> Uppsägningstiden är tre månader från och med den första i nästa månad efter att uppsägning har gjorts.
                </p>
              </div>
            </div>
            <div className="checkapplyer">
              <div className="checkboxwrapperapply">
                <button className='applybtn' onClick={handleDecline}>Tacka nej</button>
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
    navigate(`/payment/${username}/${house?._id}`);
  }
}

export default AcceptOffer;
