import './App.css'
import Axios from 'axios';
import { useEffect, useState } from 'react';

const App = () => {
  const [houseCollection, setHouseCollection] = useState([]);

  useEffect(() => {
    // Gör en GET-förfrågan till din server när komponenten laddas
    Axios.get('http://localhost:3000/api/house')
      .then(response => {
        const data = response.data;
        console.log('Data från server:', data); // Logga datan till konsolen
        setHouseCollection(data); // Spara datan i state
      })
      .catch(error => {
        console.error('Fel vid hämtning av houseCollection:', error);
      });
  }, []);
  return (
    <div className="App">
      <h1>House Collection</h1>
      <ul>
        {houseCollection.map((house, index) => (
          <li key={index}>{house.city}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
