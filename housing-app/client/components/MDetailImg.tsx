import React from 'react';
import { House } from '../types/house';
import '../css/components/MDetailImg.css';

interface MDetailImgProps {
  house: House;
}
const MDetailImg: React.FC<MDetailImgProps> = ({ house }) => {

  return (
    <div className="m-detail-img">
      <div className="imgdetContainer">
        {house.img && house.img.length > 0 ? (
          <img
            className='m-card-img'
            src={house.img[0]}
            alt={house.titel}
          />
        ) : (
          <div className="no-image">No Image</div>
        )}
      </div>
    </div>
  );
};

export default MDetailImg;