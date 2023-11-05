import { useState } from 'react';
import '../css/components/Filterbar.css';
import FilterModal from '../components/FilterModal';
import { House } from '../types/house';
import Icon from '../components/icons/Icon';

interface FilterbarProps {
  onFilter: (filteredHouses: House[], filterType: string | null) => void;
  houses: House[];
}

const Filterbar: React.FC<FilterbarProps> = ({ onFilter, houses }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

const handleFilterClick = (filterType: string) => {
  if (activeFilter === filterType) {
    setActiveFilter(null);
    onFilter(houses, null);
  } else {
    setActiveFilter(filterType);
    onFilter(houses.filter((house) => house.type === filterType), filterType); // Filtrera efter typ
  }
};

return (
<div className="filterwrapperparent">
    <div className="filterwrapper">
      <div className={`filtericon ${activeFilter === 'House' ? 'active' : ''}`} onClick={() => handleFilterClick('House')}>
        <Icon showText={false} include="House" />
        <p>Hus</p>
      </div>
      <div className={`filtericon ${activeFilter === 'Apartment' ? 'active' : ''}`} onClick={() => handleFilterClick('Apartment')}>
        <Icon showText={false} include="Buildings" />
        <p>Lägenhet</p>
      </div>
      <div className={`filtericon ${activeFilter === 'Room' ? 'active' : ''}`} onClick={() => handleFilterClick('Room')}>
        <Icon showText={false} include="DoorOpen" />
        <p>Rum</p>
      </div>
      <div className={`filtericon ${activeFilter === 'Collective' ? 'active' : ''}`} onClick={() => handleFilterClick('Collective')}>
        <Icon showText={false} include="Collective" />
        <p>Kollektiv</p>
      </div>
      <div className='filtericon' onClick={() => setIsModalOpen(true)}>
        <Icon showText={false} include="AdjustmentsHorizontal" />
        <p>Filter</p>
      </div>
        {isModalOpen && (
          <FilterModal onClose={() => setIsModalOpen(false)} isOpen={isModalOpen} onFilter={onFilter} houses={houses} />
        )}
    </div>
</div>
  );
};

export default Filterbar;