import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { getApplicationByUser } from "../data/applicationApi";
import { HouseSelection } from '../types/application';

const AcceptOffer = () => {
  const { username } = useParams<{ username: string }>();
  const [userApplications, setUserApplications] = useState<HouseSelection[] | null>(null);
  const navigate = useNavigate();

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

    return (
      <div>
        <h2>Bostadsansökan bekräftad</h2>
        <div>
          <div>
            {/* Övrig innehåll här */}
          </div>
        </div>
        <button onClick={handleDecline}>Tacka nej</button>
        <button onClick={handlePayment}>Till betalning</button>
      </div>
    );
  } else {
    return (
      <div>
        <p>Inga ansökningar hittades för användaren.</p>
      </div>
    );
  }

  function handleDecline() {
    navigate(`/userapplication/${username}`);
  }

  function handlePayment() {
    navigate('/payment');
  }
}

export default AcceptOffer;

