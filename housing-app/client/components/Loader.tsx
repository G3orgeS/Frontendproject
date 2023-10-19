import React from 'react';
import '../css/components/Loader.css'

interface LoaderProps {
  size?: string;
  color?: string;
}
const Loader: React.FC<LoaderProps> = ({ size = '50px', color = '#E78121' }) => {
  const loaderStyle = {
    width: size,
    height: size,
    borderColor: color,
    borderTopColor: 'transparent',
  };

  return (
    <div className="loader-container">
      <div className="loader" style={{ borderColor: "#E78121" }}></div>
    </div>
  );
};

export default Loader;
