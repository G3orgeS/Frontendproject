import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { House } from '../types/house';
import { houseApi } from '../api/houseApi';
import '../css/pages/HouseDetail.css';
import InfoContainer from '../components/InfoContainer'
import DetailImg from '../components/DetailImg'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

  const parsedDate = new Date(house.firstDate);
  const day = parsedDate.getDate();
  const month = parsedDate.getMonth() + 1;
  const year = parsedDate.getFullYear();
  const formattedDate = `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}-${year}`;

  return (
    <>
      <div className="houseDetailContainer">
        <DetailImg house={house} />
        <InfoContainer house={house} formattedDate={formattedDate} />
      </div>
      <div className="btncont">
        <button className="applybtn">Till ansökan 
          <FontAwesomeIcon icon={faArrowRight}/>
        </button>
      </div>
      <div className="descriptionContainer">
        <h1>{house.titel}</h1>
        <div className="infowrapper">
          <p>{house.cost} kr</p>
          <p>{house.numberOfRooms} RoK</p>
          <p>{house.size} kvm</p>
        </div>
        <div className="description">
          <p>Description: {house.description}</p>
          <div className="date"><p>First Available Date: {formattedDate}</p></div>
          <div className="floor"><p>Floor: {house.floor}</p></div>
          <div className="recommendation"><p>Recommendation: {house.recommendation}</p></div>
        </div>
      </div>
    </>
  );
};

export default HouseDetail;
