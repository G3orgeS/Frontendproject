import React from 'react';
import { House } from '../types/house';
import '../css/components/InfoContainer.css';
import Icon from './icons/Icon';

interface InfoContainerProps {
  house: House;
  formattedDate: string;
}

const InfoContainer: React.FC<InfoContainerProps> = ({ house, formattedDate }) => {
  let typeText = '';

  switch (house.type) {
    case 'Apartment':
      typeText = 'Lägenhet';
      break;
    case 'Room':
      typeText = 'Rum';
      break;
    case 'Collective':
      typeText = 'Kollektiv';
      break;
    case 'House':
      typeText = 'Hus';
      break;
    default:
      break;
  }

  return (
    <div className="infoContainer">
      <div className="iadress">
        <Icon showText={false} include="Map" />
        <p>{house.adress}</p>
      </div>
      <div className="infoborder" />
      <div className="irent">
        <Icon showText={false} include="Money" />
        <p>{house.cost} kr/mån</p>
      </div>
      <div className="infoborder" />
      <div className="iroom">
        <Icon showText={false} include="bed" />
        <p>{house.numberOfRooms} rum</p>
      </div>
      <div className="infoborder" />
      <div className="ispace">
        <Icon showText={false} include="box" />
        <p>{house.size}m2</p>
      </div>
      <div className="infoborder" />
      <div className="idate">
        <Icon showText={false} include="TodayOutline" />
        <p>{formattedDate}</p>
      </div>
      <div className="infoborder" />
      <div className="itype">
        <Icon showText={false} include="Buildings" />
        <p>{typeText}</p>
      </div>
    </div>
  );
};

export default InfoContainer;
