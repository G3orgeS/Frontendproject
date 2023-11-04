import React from 'react';
import '../../css/components/global/ImgWrapper.css' 

interface ImgWrapperProps {
  src: string;
  alt: string; 
  style?: React.CSSProperties;
}

const ImgWrapper: React.FC<ImgWrapperProps> = ({ src, alt, style }) => {
  return (
    <img src={src} alt={alt} style={style} className="img-wrapper"/>
  );
};

export default ImgWrapper;