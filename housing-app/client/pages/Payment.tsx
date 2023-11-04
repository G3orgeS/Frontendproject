import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { getApplicationByUser } from "../data/applicationApi";
import { HouseSelection } from '../types/application';
import '../css/pages/Payment.css';
import Loader from "../components/global/Loader";
import PaymentForm from '../components/form/PaymentForm';
import '../resource/studystay-logo2.jpg'

const logo = '../resource/studystay-logo2.jpg'
const Payment = () => {
  const { username, houseId } = useParams<{ username: string; houseId: string }>();
  const [userApplications, setUserApplications] = useState<HouseSelection[] | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  let userhouse: HouseSelection | null = null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (username) {
          const applications = await getApplicationByUser(username);
          setUserApplications(applications);

          if (applications && applications.length > 0) {
            userhouse = applications[0];
          }
        }
      } catch (error) {
        console.error("Ett fel uppstod: ", error);
      }
      setLoading(false);
    };
    fetchData();
  }, [username]);

  const handlePayment = () => {
    navigate(`/confirmed/${username}/${houseId}`);
  };

  if (userApplications && userApplications.length > 0) {
    userhouse = userApplications[0];
  } else {
    return (
      <div>
        <p>Inga ansökningar hittades för användaren.</p>
      </div>
    );
  }

  return (
    <div className="payment-container">
      <h2>Betalning</h2>
      {loading && <Loader />}
      <div className="payment-text">
        <p>Registrera ditt kort för att slutföra godkännandet av bostaden.</p>
        <p>Depositionen kommer att dras omgående och återbetalas när du flyttar ut.</p>
        <p>Hyran kommer att dras från ditt konto den sista dagen varje månad.</p>
      </div>
      <div className="payment-image">
        <img src={logo} alt="Betalning" />
      </div>
      <div className="payment-cost">
        Kostnad: {userhouse?.cost} kr/mån
      </div>
      <PaymentForm handlePayment={handlePayment} />
    </div>
  );
};

export default Payment;