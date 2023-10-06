import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { House } from '../types/house';
import { houseApi } from '../api/houseApi';
import '../css/pages/HouseDetail.css';

const HouseDetail = () => {
  const { id } = useParams<{ id?: string }>();
  const [house, setHouse] = useState<House | null>(null);

  useEffect(() => {
    if (id) {
      houseApi.getHouseById(id).then((data) => {
        setHouse(data);
      }).catch((error) => {
        console.error('Error fetching house data:', error);
      });
    }
  }, [id]);

  if (!house) {
    return <div>Loading...</div>;
  }

  return (
    <div className="houseDetailContainer">
      <div className="imgContainer">
        <div className="imgLeft">
          {house.img && house.img.length > 0 && (
            <img
              className='imgDetail'
              src={house.img[0]} // Ladda den första bilden här
              alt={house.titel}
            />
          )}
        </div>
        <div className="imgMid">
          {house.img && house.img.length > 1 && (
            <img
              className='imgDetail'
              src={house.img[1]} // Ladda den andra bilden här
              alt={house.titel}
            />
          )}
        </div>
        <div className="imgRight">
          {house.img && house.img.length > 2 && (
            <img
              className='imgDetail'
              src={house.img[2]} // Ladda den tredje bilden här
              alt={house.titel}
            />
          )}
          {house.img && house.img.length > 3 && (
            <img
              className='imgDetail'
              src={house.img[3]} // Ladda den fjärde bilden här
              alt={house.titel}
            />
          )}
        </div>
      </div>
      <div className="infoContainer">
        <div className="adress"><p>Address: {house.adress}</p></div>
        <div className="rent"><p>Cost: {house.cost} kr</p></div>
        <div className="room"><p>Number of Rooms: {house.numberOfRooms}</p></div>
        <div className="space"><p>Size: {house.size}</p></div>
        <div className="date"><p>Period: {house.period} months</p></div>
        <div className="type"><p>Type: {house.type}</p></div>
      </div>
      <button className="applybtn">Till ansökan</button>
      <div className="imgContainer2">
        {/* Här kan du inkludera de resterande bilderna om du vill */}
        {house.img && house.img.length > 4 && (
          <img
            className='imgDetail'
            src={house.img[4]}
            alt={house.titel}
          />
        )}
        {house.img && house.img.length > 5 && (
          <img
            className='imgDetail'
            src={house.img[5]}
            alt={house.titel}
          />
        )}
      </div>
      <div className="descriptionContainer">
        <h1>{house.titel}</h1>
        <div className="infowrapper">
          <p>Cost: {house.cost} kr</p>
          <p>Number of Rooms: {house.numberOfRooms}</p>
          <p>Size: {house.size}</p>
        </div>
        <div className="description">
          <p>Description: {house.description}</p>
        </div>
      </div>
    </div>
  );
};

export default HouseDetail;
