import React from 'react';
import { House } from '../types/house';
import '../css/components/InfoContainer.css';
import { faLocationDot, faMoneyBill, faBed, faCube, faCalendarDays, faBuilding, faDoorOpen, faUsers, faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface InfoContainerProps {
  house: House; 
  formattedDate: string;
}

const InfoContainer: React.FC<InfoContainerProps> = ({ house, formattedDate }) => {
  let typeIcon;

  switch (house.type) {
    case 'Apartment':
      typeIcon = <FontAwesomeIcon icon={faBuilding} />;
      break;
    case 'Room':
      typeIcon = <FontAwesomeIcon icon={faDoorOpen} />;
      break;
    case 'Collective':
      typeIcon = <FontAwesomeIcon icon={faUsers} />;
      break;
    case 'House':
      typeIcon = <FontAwesomeIcon icon={faHouse} />;
      break;
    default:
      typeIcon = null; 
      break;
  }

  return (
    <div className="infoContainer">
      <div className="adress">
        <FontAwesomeIcon icon={faLocationDot} />
        <p>{house.adress}</p>
      </div>
      <div className="rent">
        <FontAwesomeIcon icon={faMoneyBill} />
        <p>{house.cost} kr</p>
      </div>
      <div className="room">
        <FontAwesomeIcon icon={faBed} />
        <p>{house.numberOfRooms}</p>
      </div>
      <div className="space">
        <FontAwesomeIcon icon={faCube} />
        <p>{house.size} kvm</p>
      </div>
      <div className="date">
        <FontAwesomeIcon icon={faCalendarDays} />
        <p>{formattedDate}</p>
      </div>
      <div className="type">
        {typeIcon} 
        <p>{house.type}</p>
      </div>
    </div>
  );
};

export default InfoContainer;
