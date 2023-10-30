import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getHouseById } from '../data/houseApi'; // Updated import
import { House } from '../types/house';
import { Application } from '../types/application';
import { fetchUserByToken } from '../data/userApi';
import { createApplication } from '../data/applicationApi';
import { Users } from '../types/user';
import '../css/pages/Application.css';
import Rating from '../components/Rating';

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
      getHouseById(id)
        .then((houseData) => {
          setHouse(houseData);
        })
        .catch(() => {
        });
    }
  }, [id]);

  const handleMainCheckboxChange = () => {
    setAllConditionsAccepted(!allConditionsAccepted);
  };

const submitApplication = () => {
  if (!userInfo || !house) {
    console.error('Användarnamn eller hus saknas.');
    return;
  }

  const cost = parseFloat(houseCost);
  const costIsValid = !isNaN(cost);

  if (!costIsValid) {
    console.error('Kostnad är ogiltig.');
    return;
  }

  if (userInfo && userInfo.applications) {
    const isAlreadyApplied = userInfo.applications.some((application) => application.houseselection[0].id === id);
  
    if (isAlreadyApplied) {
      console.error('En ansökan för detta boende finns redan.');
      return;
    }
  }

  let status = getRandomStatus();

  if (userInfo?.userName === 'gman' && (!userInfo.applications || userInfo.applications.length === 0)) {
    status = 'approved';
  }

  const applicationData: Application = {
    _id: '',
    user: userInfo?.userName || '',
    houseselection: [
      {
        id: id || '',
        title: houseTitle || '',
        address: `${houseCity}, ${houseZipCode}` || '',
        img: houseImage || '',
        landlord: houseLandlord || '',
        size: house.size || '',
        room: house.numberOfRooms || '',
        cost: cost,
        status: status,
      },
    ],
  };

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
              <p>Betyg </p><p><Rating averageRating={house.recommendation} /></p>
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
