import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getHouseById } from '../data/houseApi';
import { House } from '../types/house';
import { Application } from '../types/application';
import { fetchUserByToken } from '../data/userApi';
import { createApplication } from '../data/applicationApi';
import { Users } from '../types/user';
import Loader from '../components/global/Loader';
import Button from '../components/global/Button';
import TermsAndConditions from '../components/TermsAndConditions';
import ApplySummary from '../components/ApplySummary';
import '../css/pages/Application.css';

function getRandomStatus() {
  const statuses = ["untreated", "not approved", "approved"];
  const randomIndex = Math.floor(Math.random() * statuses.length);
  return statuses[randomIndex];
}

const ApplicationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [userId] = useState<string | null>(null);
  const [house, setHouse] = useState<House | null>(null);
  const [allConditionsAccepted, setAllConditionsAccepted] = useState(false);
  const [userInfo, setUserInfo] = useState<Users | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [shouldShake, setShouldShake] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      fetchUserByToken(token)
        .then((data) => {
          if (data) {
            setUserInfo(data);
            setIsUserLoggedIn(true);
          } else {
            console.error('Något gick fel vid hämtning av användarinformation.');
          }
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }, [userId]);

  useEffect(() => {
    if (id) {
      getHouseById(id)
        .then((houseData) => {
          setHouse(houseData);
          setLoading(false);
        })
        .catch(() => { });
    }
  }, [id]);

  const handleMainCheckboxChange = () => {
    setAllConditionsAccepted(!allConditionsAccepted);
  };

  const submitApplication = () => {
    if (!userInfo || !house || !allConditionsAccepted) {
      console.error('Användarnamn eller hus saknas.');
      setIsCheckboxChecked(false);
      setShouldShake(true); 
      setTimeout(() => {
        setShouldShake(false);
      }, 1000); 
      return;
    }

    const cost = parseFloat(houseCost);
    const costIsValid = !isNaN(cost);

    if (!costIsValid) {
      console.error('Kostnad är ogiltig.');
      return;
    }

    if (userInfo && userInfo.applications) {
      const isAlreadyApplied = userInfo.applications.some(
        (application) => application.houseselection[0].id === id
      );

      if (isAlreadyApplied) {
        console.error('En ansökan för detta boende finns redan.');
        return;
      }
    }

    let status = getRandomStatus();

    const applicationData: Application = {
      _id: '',
      user: userInfo?.userName || '',
      houseselection: [
        {
          id: id || '',
          title: houseTitle || '',
          address: `${house.adress}` || '',
          zipcode: `${houseZipCode}` || '',
          city: `${houseCity}` || '',
          img: houseImage || '',
          landlord: houseLandlord || '',
          size: house.size || '',
          room: house.numberOfRooms || '',
          cost: cost,
          status: status,
        },
      ],
    };
    console.log('applicationData:', applicationData);

    createApplication(applicationData, userInfo?.userName)
      .then((response) => {
        console.log('Ansökan skickades:', response);
        navigate(`/userapplication/${userInfo?.userName}`);
      })
      .catch((error) => {
        console.error('Fel vid skickande av ansökan:', error);
      });
  };

  const houseTitle = house?.titel;
  const houseImage = house ? house.img[0] : '';
  const houseCity = house ? house.city : '';
  const houseZipCode = house ? house.zipcode : '';
  const houseCost = house ? house.cost : '';
  const houseFloor = house ? house.floor : '';
  const houseFirstDate = house ? house.firstDate : new Date();
  const houseLandlord = house ? house.landlord[0] : '';

  const formattedHouseFirstDate =
    houseFirstDate instanceof Date ? houseFirstDate.toLocaleDateString() : '';

  return (
    <>
      <div className="applycontainerwrapper">
        <div className="applycontainer">
          <div className="applyh2wrapper1">
          <h4 className="house-title1">Ansök till {house?.adress}</h4>
          </div>
          <div className="fullerhouse">
            {loading && <Loader />}
            <div className="fullhousewrapperapply">
              {house && (
                <div className="housecardapplyinfo">
                  <div className="apply-house-image">
                    <img src={houseImage} alt="House Image" />
                  </div>
                  <ApplySummary city={house.city} floor={house.floor} firstDate={new Date(house.firstDate).toLocaleDateString()} landlord={house.landlord[0]} rating={house.recommendation} cost={parseFloat(house.cost)} />
                </div>
              )}
              <div className="applicationbodywrapper">
                <TermsAndConditions />
                <p>Vänligen läs igenom alla villkor noga. Om du har några frågor eller funderingar, kontakta hyresföreningen innan du tackar ja.</p>
                <div className="checkapplyer">
                  {isUserLoggedIn && (
                    <div className={`checkboxwrapperapply ${shouldShake ? 'shake' : ''}`}>
                      <input
                        type="checkbox"
                        checked={allConditionsAccepted}
                        onChange={handleMainCheckboxChange}
                      />
                      <label>Jag godkänner hyresvärdens villkor</label>
                    </div>
                  )}
                  {isUserLoggedIn ? (
                    <Button onClick={submitApplication} disabled={!isCheckboxChecked}>
                      Ansökan
                    </Button>
                  ) : (
                    <p className="red-text">
                      *Du måste vara inloggad för att ansöka.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicationPage;
