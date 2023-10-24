import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { houseApi } from '../data/houseApi';
import { House } from '../types/house';
import { Application } from '../types/application';
import { fetchUserByToken } from '../data/userApi';
import { createApplication } from '../data/applicationApi';
import { Users } from '../types/user';
import '../css/pages/Application.css';

const ApplicationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [userId, setUserId] = useState<string | null>(null);
  const [house, setHouse] = useState<House | null>(null);
  const [allConditionsAccepted, setAllConditionsAccepted] = useState(false);
  const [userInfo, setUserInfo] = useState<Users | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      fetchUserByToken(token)
        .then((data) => {
          if (data) {
            setUserInfo(data);
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
      houseApi.getHouseById(id)
        .then((houseData) => {
          setHouse(houseData);
          // console.log('Husinfo hämtad:', houseData);
        })
        .catch((error) => {
          // console.error('Error fetching house data:', error);
        });
    }
  }, [id]);

  const handleMainCheckboxChange = () => {
    setAllConditionsAccepted(!allConditionsAccepted);
  };

  const submitApplication = () => {
    if (!userInfo || !house) {
      console.log(userInfo?.userName);
      // console.error('Användarnamn eller hus saknas.');
      return;
    }

    const applicationData: Application = {
      _id: '',
      user: userInfo.userName,
      houseselection: [String(id)],
    };

    console.log(userInfo?.userName);

    createApplication(applicationData, userInfo?.userName) // Lägg till användarnamn som andra argument
      .then((response) => {
        console.log('Ansökan skickades:', response);
        navigate('/userapplication');
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
  const houseRecommendation = house ? house.recommendation : '';

  const formattedHouseFirstDate = houseFirstDate instanceof Date ? houseFirstDate.toLocaleDateString() : '';

  return (
    <>
    <div className="applycontainer">
      <h2 className="house-title">{houseTitle}</h2>
      <div className="fullerhouse">
      <div className="fullhousewrapperapply">
      {house && (
        <div className='housecardapplyinfo'>
          <div className="house-image">
            <img src={houseImage} alt="House Image" />
          </div>
          <div className="overview">
            <h3>Översikt</h3>
            <div className="papplywrap">
              <p>hyra:</p><p>{houseCost}kr/mån</p>
            </div>
            <div className="papplywrap">
              <p>Stad:</p><p>{houseCity}, {houseZipCode}</p>
            </div>
            <div className="papplywrap">
              <p>Våning: </p><p>{houseFloor}</p>
            </div>
            <div className="papplywrap">
              <p>Inflytt: </p><p>{formattedHouseFirstDate}</p>
            </div>
            <div className="papplywrap">
              <p>Hyresvärd: </p><p>{houseLandlord}</p>
            </div>
            <div className="papplywrap">
              <p>Betyg </p><p>{houseRecommendation}</p>
            </div>
          </div>
        </div>
      )}
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
        <label>
          Vänligen läs igenom alla villkor noga. Om du har några frågor eller funderingar, kontakta hyresföreningen innan du tackar ja.
        </label>
        <div className="checkapplyer">
        <div className="checkboxwrapperapply">
        <input
          type="checkbox"
          checked={allConditionsAccepted}
          onChange={handleMainCheckboxChange}
          />
          <label>Jag godkänner alla villkor</label>
          <button className='applybtn'  onClick={submitApplication}>Skicka in ansökan</button>
          </div>
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
