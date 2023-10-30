import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { getApplicationByUser } from "../data/applicationApi";
import { HouseSelection } from '../types/application';
import '../css/pages/Payment.css';

const Payment = () => {
  const { username } = useParams<{ username: string }>();
  const [userApplications, setUserApplications] = useState<HouseSelection[] | null>(null);
  const navigate = useNavigate();
  const logo = '../resource/studystay-logo 2.jpg';

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (username) {
          const applications = await getApplicationByUser(username);
          setUserApplications(applications);
        }
      } catch (error) {
        console.error("Ett fel uppstod: ", error);
      }
    };
    fetchData();
  }, [username]);

  if (userApplications && userApplications.length > 0) {
    const userhouse = userApplications[0];

    const handlePayment = () => {
      navigate(`/confirmed/${username}/${userhouse.id}`);
    };

    return (
      <div className="payment-container">
        <h2>Betalning</h2>
        <div className="payment-text">
          <p>Registrera ditt kort för att slutföra godkännandet av bostaden.</p>
          <p>Depositionen kommer att dras omgående och återbetalas när du flyttar ut.</p>
          <p>Hyran kommer att dras från ditt konto den sista dagen varje månad.</p>
        </div>
        <div className="payment-image">
          {/* Byt ut detta med den faktiska bild-URLen */}
          <img src={logo} alt="Betalning" />
        </div>
        <div className="payment-cost">
          Kostnad: {userhouse.address} kr/mån
        </div>
        <div className="payment-form">
          <input type="text" placeholder="Namn på bankkortet" />
          <input type="text" placeholder="Kortnummer" />
          <input type="text" placeholder="Utgångsdatum" />
          <input type="text" placeholder="Säkerhetskod" />
          <button className="payment-button" onClick={handlePayment}>Betala</button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <p>Inga ansökningar hittades för användaren.</p>
      </div>
    );
  }
};

export default Payment;
