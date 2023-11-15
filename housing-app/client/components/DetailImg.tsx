import React from 'react';
import { House } from '../types/house';
import '../css/components/DetailImg.css'

interface DetailImgProps {
  house: House;
}

const DetailImg: React.FC<DetailImgProps> = ({ house }) => {
  return (
    <div className="DetailImgContainer">
      <div className="mobiledetailonly">
      <div className="imgLeft">
        {house.img && house.img.length > 0 && (
          <img
            className='imgDetailsize'
            src={house.img[0]} 
            alt={house.titel}
          />
        )}
      </div>
      <div className="imgMid">
        {house.img && house.img.length > 1 && (
          <img
            className='imgDetailsize'
            src={house.img[1]} 
            alt={house.titel}
          />
        )}
      </div>
      </div>
      <div className="imgRight">
        {house.img && house.img.length > 2 && (
          <img
            className='imgDetailsize'
            src={house.img[2]} 
            alt={house.titel}
          />
        )}
        {house.img && house.img.length > 3 && (
          <img
            className='imgDetailsize'
            src={house.img[3]} 
            alt={house.titel}
          />
        )}
      </div>
    </div>
  );
};

export default DetailImg;