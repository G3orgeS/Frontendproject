import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faBuilding, faDoorOpen, faUsers, faFilter } from '@fortawesome/free-solid-svg-icons';
import '../css/components/Filterbar.css';
import FilterModal from '../components/FilterModal'

const Filterbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleFilterClick = () => {
    setIsModalOpen(true)
  }

  return (
    <div className="filterwrapperparent">
    <div className="filterwrapper">
      <Link to={'/houselist/house'} className='filtericon'>
        <FontAwesomeIcon icon={faHouse} />
        <p>Hus</p>
      </Link>
      <Link to={'/houselist/apartment'} className='filtericon'>
        <FontAwesomeIcon icon={faBuilding} />
        <p>Lägenhet</p>
      </Link>
      <Link to={'/houselist/room'} className='filtericon'>
        <FontAwesomeIcon icon={faDoorOpen} />
        <p>Rum</p>
      </Link>
      <Link to={'/houselist/collective'} className='filtericon'>
        <FontAwesomeIcon icon={faUsers} />
        <p>Kollektiv</p>
      </Link>
      <div className='filtericon' onClick={handleFilterClick}>
        <FontAwesomeIcon icon={faFilter} />
        <p>filter</p>
      </div>
      {isModalOpen && <FilterModal onClose={() => setIsModalOpen(false)} isOpen={isModalOpen} />}

    </div>
    </div>
  );
}

export default Filterbar;
