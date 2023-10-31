import React, { useEffect, useState } from 'react';
import '../css/components/FilterModal.css';
import { House } from '../types/house';

interface FilterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onFilter: (filteredHouses: House[], filterType: string) => void;
    houses: House[];
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, onFilter, houses }) => {
    const [selectedType, setSelectedType] = useState<string>('');
    const [minPrice, setMinPrice] = useState<string>('');
    const [maxPrice, setMaxPrice] = useState<string>('');
    const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
    const [searchText, setSearchText] = useState<string>('');
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

    const handleOutsideClick = (e: MouseEvent) => {
        const modal = document.querySelector('.modal-content');
        if (modal && !modal.contains(e.target as Node)) {
            onClose();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

        const handleEscapeKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscapeKey);
        } else {
            document.removeEventListener('keydown', handleEscapeKey);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [isOpen, onClose]);

    const handleTypeSelection = (type: string) => {
        setSelectedType((prevSelectedType) => {
            const newSelectedType = prevSelectedType === type ? '' : type;
            onFilter(houses, newSelectedType);
            return newSelectedType;
        });
    };

    const handleRoomSelection = (room: string) => {
        setSelectedRooms((prevSelectedRooms) => {
            let newSelectedRooms: string[];
            if (prevSelectedRooms.includes(room)) {
                newSelectedRooms = prevSelectedRooms.filter((selected) => selected !== room);
            } else {
                newSelectedRooms = [room];
            }
            return newSelectedRooms;
        });
    };

    const handleAmenitySelection = (amenity: string) => {
        setSelectedAmenities((prevSelectedAmenities) => {
            let newSelectedAmenities: string[];
            if (prevSelectedAmenities.includes(amenity)) {
                newSelectedAmenities = prevSelectedAmenities.filter((selected) => selected !== amenity);
            } else {
                newSelectedAmenities = [...prevSelectedAmenities, amenity];
            }
            return newSelectedAmenities;
        });
    };

    const clearFilters = () => {
        setSelectedType('');
        setMinPrice('');
        setMaxPrice('');
        setSelectedRooms([]);
        setSelectedAmenities([]);
        setSearchText('');
    };

    const applyFilters = () => {
        try {
          const filters = {
            type: selectedType,
            rooms: selectedRooms,
            minPrice: minPrice,
            maxPrice: maxPrice,
            searchText: searchText,
            amenities: selectedAmenities
          };
          console.log('Alla sökkriterier:', filters); 
        console.log(houses)
        const filteredHouses = houses.filter((house) => {
            if (filters.type && filters.type !== house.type) {
                return false;
            }
            if (filters.minPrice && parseInt(filters.minPrice) > parseInt(house.cost)) {
                return false;
            }
            
            if (filters.maxPrice && parseInt(filters.maxPrice) < parseInt(house.cost)) {
                return false;
            }
            if (
                Array.isArray(filters.rooms) &&
                filters.rooms.length > 0 &&
                !filters.rooms.some((room) => house.numberOfRooms.includes(room as string))
            ) {
                return false;
            }
            if (
                Array.isArray(filters.amenities) &&
                filters.amenities.length > 0 &&
                !filters.amenities.every((amenity) => house.extras.includes(amenity as string))
            ) {
                return false;
            }
            if (
                filters.searchText &&
                house.description.toLowerCase().indexOf(filters.searchText.toLowerCase()) === -1
            ) {
                return false;
            }
            return true;
        });
        console.log('Filtrerade hus:', filteredHouses);

        onFilter(filteredHouses, JSON.stringify(filters));
    } catch (error) {
      console.error('Något gick fel vid filtrering:', error);
    }
  };

return (
<div className={`modal ${isOpen ? 'open' : ''}`}>
<div className="modal-content">
    <div className="modalheaderwrapper">
        <div className="modal-header">
            <div className="cross">
                <span className="close-button" onClick={onClose}>&times;</span>
            </div>
            <h2>Filter</h2>
        </div>
    </div>
    <div className="filter-section">
        <div className="textwrapper">
            <h3>Property Type</h3>
            <p>Search for rooms, entire properties, or other property types.</p>
        </div>
        <div className="btnwrapper">
            <button
                className={`choicebtn ${selectedType === 'Apartment' ? 'selected' : ''}`}
                onClick={() => handleTypeSelection('Apartment')}
            >
                Apartment
            </button>
            <button
                className={`choicebtn ${selectedType === 'House' ? 'selected' : ''}`}
                onClick={() => handleTypeSelection('House')}
            >
                House
            </button>
            <button
                className={`choicebtn ${selectedType === 'Collective' ? 'selected' : ''}`}
                onClick={() => handleTypeSelection('Collective')}
            >
                Collective
            </button>
            <button
                className={`choicebtn ${selectedType === 'Room' ? 'selected' : ''}`}
                onClick={() => handleTypeSelection('Room')}
            >
                Room
            </button>
        </div>
    </div>
    <div className="filter-section">
        <div className="textwrapper">
            <h3>Price Range</h3>
            <p>Monthly rent</p>
        </div>
        <div className="inputwrapper">
            <div className="input-container">
                <input
                    id="minPrice"
                    className="inputnum"
                    type="number"
                    placeholder="Kr 3000"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                />
                <label htmlFor="minPrice">Min</label>
            </div>
            <div className="input-container">
                <input
                    id="maxPrice"
                    className="inputnum"
                    type="number"
                    placeholder="Kr 7000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />
                <label htmlFor="maxPrice">Max</label>
            </div>
        </div>
    </div>
    <div className="filter-section">
        <div className="textwrapper">
            <h3>Search</h3>
            <p>Search for specific words or phrases in the listing description.</p>
        </div>
        <div className="inputwrapper">
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Keyword..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>
            <button>Search</button>
        </div>
    </div>
    <div className="filter-section">
        <div className="textwrapper">
            <h3>Number of Rooms</h3>
            <div className="room-buttons">
                <button
                    className={`choicebtn ${selectedRooms.includes('') ? 'selected' : ''}`}
                    onClick={() => handleRoomSelection('')}
                >
                    All
                </button>
                {[...Array(10).keys()].map((roomNumber) => (
                    <button
                        key={roomNumber}
                        className={`choicebtn ${selectedRooms.includes(String(roomNumber + 1)) ? 'selected' : ''}`}
                        onClick={() => handleRoomSelection(String(roomNumber + 1))}
                    >
                        {roomNumber + 1}
                    </button>
                ))}
            </div>
        </div>
    </div>
    <div className="filter-section">
        <div className="textwrapper">
            <h3>Bekvämligheter</h3>
            <p>Väsentligheter</p>
        </div>
        <div className="checkboxwrapper">
            <div className="check">
                <input
                    type="checkbox"
                    name="wifi"
                    id="wifi"
                    checked={selectedAmenities.includes('wifi')}
                    onChange={() => handleAmenitySelection('wifi')}
                />
                <label htmlFor="wifi">Wifi</label>
            </div>
            <div className="check">
                <input
                    type="checkbox"
                    name="kitchen"
                    id="kitchen"
                    checked={selectedAmenities.includes('kitchen')}
                    onChange={() => handleAmenitySelection('kitchen')}
                />
                <label htmlFor="kitchen">Kök</label>
            </div>
            {/* Implementera liknande kod för andra bekvämligheter */}
        </div>
    </div>
    <div className="filter-section">
        <div className="endwrapper">
            <button onClick={clearFilters} className="black-underline">
                Rensa filter
            </button>
            <button className="showbtn" onClick={applyFilters}>
                Visa boende
            </button>
        </div>
    </div>
</div>
</div>
    );
};

export default FilterModal;
