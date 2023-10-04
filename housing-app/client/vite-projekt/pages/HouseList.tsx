import { useEffect, useState } from 'react';
import { houseApi } from '../api/houseApi'; // Ändra sökvägen till houseApi
import { House } from '../types/house'

function HouseList() {
  const [houses, setHouses] = useState<House[]>([]);

  useEffect(() => {
    // Anropa API för att hämta alla hus
    async function fetchHouses() {
      try {
        const allHouses = await houseApi.getAllHouses();
        setHouses(allHouses);
      } catch (error) {
        console.error('Något gick fel vid hämtning av hus:', error);
      }
    }

    // Kör funktionen för att hämta hus när komponenten mountas
    fetchHouses();
  }, []);

  return (
    <div>
      <h1>Huslista</h1>
      <ul>
        {houses.map((house) => (
          <li key={house._id}>
            <h2>{house.title}</h2>
            <p>Adress: {house.adress}</p>
            <p>Postnummer: {house.zipcode}</p>
            {/* Lägg till mer information om huset här */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HouseList;
