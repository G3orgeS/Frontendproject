import React from 'react';
import '../css/components/ImgWrapper.css' // Importera den externa CSS-filen

interface ImgWrapperProps {
  src: string;
  alt: string; // Ange typtypen som string för alt
}

const ImgWrapper: React.FC<ImgWrapperProps> = ({ src, alt }) => {
  return (
    <img
      src={src}
      alt={alt}
      className="img-wrapper"
    />
  );
};

export default ImgWrapper;
