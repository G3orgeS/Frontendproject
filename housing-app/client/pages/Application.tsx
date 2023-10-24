import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
          console.log('Husinfo hämtad:', houseData);
        })
        .catch((error) => {
          console.error('Error fetching house data:', error);
        });
    }
  }, [id]);

  const handleMainCheckboxChange = () => {
    setAllConditionsAccepted(!allConditionsAccepted);
  };

  const submitApplication = () => {
    if (!userInfo || !house) {
      console.log(userInfo?.userName);
      console.error('Användarnamn eller hus saknas.');
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
      })
      .catch((error) => {
        console.error('Fel vid skickande av ansökan:', error);
      });
  };

  return (
    <>
      {house && (
        <div className='housecardapplyinfo'>
          <h2>{house.titel}</h2>
          <img className='imgappli' src={house.img[0]} alt="House Image" />
          <div className="overview">
            <div className="papplywrap">
          <h3>Översikt</h3>
          </div>
          <div className="papplywrap">
          <p>Stad:</p><p>{house.city}, {house.zipcode}</p>
          </div>
          <div className="papplywrap">
          <p>Adress:</p><p>{house.adress}</p>
          </div>
          <div className="papplywrap">
          <p>Våning:</p><p>{house.floor} av 10</p>
          </div>
          <div className="papplywrap">
          <p>Hyresvärd:</p><p>{house.landlord[0]}</p>
          </div>
          <div className="papplywrap">
          <p>Hyra:</p><p>{house.cost} kr</p>
          </div>
          <div className="papplywrap">
          <p>Betyg:</p><p>{house.recommendation}</p>
          </div>
          </div>
        </div>
      )}
          <div className='applicationbodywrapper'>
      <div className='textwrap2info'>
        <p>
          Viktiga krav och villkor från hyresföreningen:
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
        <div className="checkboxwrapperapply">
        <input
          type="checkbox"
          checked={allConditionsAccepted}
          onChange={handleMainCheckboxChange}
          />
          <label>Jag godkänner alla villkor</label>
          </div>
      </div>

    </div>
      <button onClick={submitApplication}>Skicka in ansökan</button>
      </>
  );
};

export default ApplicationPage;
