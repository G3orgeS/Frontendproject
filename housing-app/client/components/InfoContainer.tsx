import React from 'react';
import { House } from '../types/house';
import '../css/components/InfoContainer.css';
import Icon from './icons/Icon';

interface InfoContainerProps {
  house: House; 
  formattedDate: string;
}

const InfoContainer: React.FC<InfoContainerProps> = ({ house, formattedDate }) => {
  let typeIcon = null;

  switch (house.type) {
    case 'Apartment':
      typeIcon = <Icon showText={false} include="Buildings" />;
      break;
    case 'Room':
      typeIcon = <Icon showText={false} include="DoorOpen" />;
      break;
    case 'Collective':
      typeIcon = <Icon showText={false} include="Collective" />;
      break;
    case 'House':
      typeIcon = <Icon showText={false} include="House" />;
      break;
    default:
      break;
  }

  return (
    <div className="infoContainer">
      <div className="adress">
        <Icon showText={false} include="Map" />
        <p>{house.adress}</p>
      </div>
      <div className="infoborder"/>
      <div className="rent">
        <Icon showText={false} include="Money" />
        <p>{house.cost} kr/mån</p>
      </div>
      <div className="infoborder"/>
      <div className="room">
        <Icon showText={false} include="bed" />
        <p>{house.numberOfRooms} rum</p>
      </div>
      <div className="infoborder"/>
      <div className="space">
        <Icon showText={false} include="box" />
        <p>{house.size}m2</p>
      </div>
      <div className="infoborder"/>
      <div className="date">
        <Icon showText={false} include="TodayOutline" />
        <p>{formattedDate}</p>
      </div>
      <div className="infoborder"/>
      <div className="type">
        {typeIcon} 
        <p>{house.type}</p>
      </div>
    </div>
  );
};

export default InfoContainer;