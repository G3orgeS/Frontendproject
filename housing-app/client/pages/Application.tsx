import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { houseApi } from '../data/houseApi';
import { House } from '../types/house';
import '../css/pages/Application.css'

const Application: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [house, setHouse] = useState<House | null>(null);
  const [allConditionsAccepted, setAllConditionsAccepted] = useState(false);

  useEffect(() => {
    // Hämta husdata med hjälp av API
    if (id) {
      houseApi.getHouseById(id)
        .then((data) => {
          setHouse(data);
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
  };

  return (
    <div>
      {house && (
        <div>
          <img className='imgappli' src={house.img[0]} alt="House Image" />
          <h2>{house.titel}</h2>
          <p>Adress: {house.adress}</p>
          <p>Landlord: {house.landlord[0]}</p>
          <p>Cost: {house.cost} kr</p>
        </div>
      )}
      <div>
        <p>
Viktiga krav och villkor från hyresföreningen:
Deposition: En deposition om 5 000 kr måste betalas inom 7 dagar från acceptdatumet. Denna summa återbetalas när du flyttar ut, förutsatt att bostaden lämnas i ursprungligt skick.
Husdjur: Husdjur är tillåtna, men en särskild avgift om 200 kr/månad tillkommer.

Rökning: Rökning är strikt förbjuden inom bostadens område, inklusive balkonger och gemensamma utrymmen.

Inflyttningsdatum: Om inflyttningsdatum infaller på en helgdag så är inflyttningsdatumet första vardagen på kommande vecka. Var god se till att koordinera med fastighetsskötaren för att undvika kollisioner.

Uppsägningstid: Uppsägningstiden är tre månader från och med den första i nästa månad efter att uppsägning har gjorts.


Vänligen läs igenom alla villkor noga. Om du har några frågor eller funderingar, kontakta hyresföreningen innan du tackar ja.</p>
        <input
          type="checkbox"
          checked={allConditionsAccepted}
          onChange={handleMainCheckboxChange}
        />
        <label>Jag godkänner alla villkor</label>
      </div>

      <button onClick={submitApplication}>Skicka in ansökan</button>
    </div>
  );
};

export default Application;

