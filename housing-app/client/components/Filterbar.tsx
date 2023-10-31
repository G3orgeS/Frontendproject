import { useState } from 'react';
import '../css/components/Filterbar.css';
import FilterModal from '../components/FilterModal';
import FontAw from '../components/icons/FontAw';
import { House } from '../types/house';

interface FilterbarProps {
  onFilter: (filteredHouses: House[], filterType: string) => void;
  houses: House[];
}

const Filterbar: React.FC<FilterbarProps> = ({ onFilter, houses }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFilterClick = (filterType: string) => {
    if (filterType === 'Filter') {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
      onFilter([], filterType);
    }
  };

  return (
    <div className="filterwrapperparent">
      <div className="filterwrapper">
        <div className='filtericon' onClick={() => handleFilterClick('House')}>
          <FontAw iconName="house" />
          <p>Hus</p>
        </div>
        <div className='filtericon' onClick={() => handleFilterClick('Apartment')}>
          <FontAw iconName="building" />
          <p>Lägenhet</p>
        </div>
        <div className='filtericon' onClick={() => handleFilterClick('Room')}>
          <FontAw iconName="door-open" />
          <p>Rum</p>
        </div>
        <div className='filtericon' onClick={() => handleFilterClick('Collective')}>
          <FontAw iconName="users" />
          <p>Kollektiv</p>
        </div>
        <div className='filtericon' onClick={() => setIsModalOpen(true)}>
          <FontAw iconName="filter" />
          <p>Filter</p>
        </div>
        {isModalOpen &&
          <FilterModal onClose={() => setIsModalOpen(false)}
            isOpen={isModalOpen}
            onFilter={onFilter}
            houses={houses}
          />}
      </div>
    </div>
  );
}

export default Filterbar;