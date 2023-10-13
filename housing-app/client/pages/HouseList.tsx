// import '../css/pages/Home.css';
// import { useState, useEffect } from 'react';
// import { House } from '../types/house'; // Importera House-typen
// import { houseApi } from '../api/houseApi';
// import Card from '../components/Card'

// const HouseList = () => {
//   const [currentIndexes, setCurrentIndexes] = useState<number[]>([]);
//   const [houses, setHouses] = useState<House[]>([]); // Lägg till houses här

//   useEffect(() => {
//     async function fetchHouses() {
//       try {
//         const allHouses = await houseApi.getAllHouses();
//         setHouses(allHouses);
//         setCurrentIndexes(Array(allHouses.length).fill(0));
//       } catch (error) {
//         console.error('Något gick fel vid hämtning av hus:', error);
//       }
//     }

//     fetchHouses();
//   }, []);

//   const handleIndicatorClick = (index: number, imgIndex: number) => {
//     setCurrentIndexes((prevIndexes) => {
//       const updatedIndexes = [...prevIndexes];
//       updatedIndexes[index] = imgIndex;
//       return updatedIndexes;
//     });
//   };

//   return (
//     <>
//     <div className="card-display">
//     <Card
//       houses={houses} // Skicka med houses till Card-komponenten
//       currentIndexes={currentIndexes}
//       handleIndicatorClick={handleIndicatorClick}
//     />
//     </div>
//   </>
// );
// }
// Card.defaultProps = {
//   limit: 42, // Om ingen gräns anges kommer 10 kort att visas som standard
// };

// export default HouseList;
