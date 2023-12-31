import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { getApplicationByUser } from "../data/applicationApi";
import { HouseSelection } from '../types/application';
import '../css/pages/UserApplication.css';
import StatusBadge from '../components/StatusBadge'
import Loader from "../components/global/Loader";

const UserApplication = () => {
  const { username } = useParams<{ username: string }>();
  const [userApplications, setUserApplications] = useState<HouseSelection[] | null>(null);
  const [loading, setLoading] = useState(true);
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
    setLoading(false);
  }, [username]);

  const handleNavigation = (house: HouseSelection) => {
    navigate(`/acceptoffer/${username}/${house.id}`);
  };

  return (
    <div className="userapplicationmonly">
    <div className="user-application-container">
      <h2>Mina ansökningar</h2>
      <div className="user-application-welcome-text-mobile">
        <p>Nedan kan du se lägenheter som du har ansökt om och vad det är för status idag.</p>
      </div>
      <div className="user-application-welcome">
        <p>
          Välkommen till översikten av dina lägenhetsansökningar. Här kan du enkelt hålla koll på alla de bostäder du har visat intresse för.
          För varje ansökan kan du se aktuell status, vilket ger dig en tydlig uppfattning om var i processen din ansökan befinner sig.
          Vi uppdaterar informationen löpande så att du alltid har den senaste informationen till hands.
        </p>
      </div>
      {loading && <Loader/>}

      {userApplications && userApplications.length > 0 ? (
        <div className="user-application-list">
        {userApplications.map((userhouse, index) => (
          <div className="user-application-info" key={index}>
          <div className="user-application-image-container">
          <img src={userhouse.img} alt={userhouse.title} className="user-application-image" />
          </div>
          <div className="wrapper">
              <div className="user-application-text-container">
                <h3 className="user-application-title">{userhouse.title}</h3>
                <p className="user-application-text">{userhouse.address}</p>
                <p className="user-application-zipcode">{userhouse.zipcode}</p>
                <p className="user-application-city">{userhouse.city}</p>
              </div>
              <div className="user-application-button-container">
                <StatusBadge status={userhouse.status} />
                <button className="user-application-button" onClick={() => handleNavigation(userhouse)}>Gå Vidare</button>
              </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>Inga ansökningar hittades för användaren.</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default UserApplication;