import React, { useEffect, useState,  } from 'react';
import '../css/components/FilterModal.css';

interface FilterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose }) => {
    const [selectedType, setSelectedType] = useState<string>('');
    const [minPrice, setMinPrice] = useState<string>('');
    const [maxPrice, setMaxPrice] = useState<string>('');
    const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

    const handleOutsideClick = (e: MouseEvent) => {
        const modal = document.querySelector('.modal-content')
        if (modal && !modal.contains(e.target as Node)) {
            onClose()
        }
    }
    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleOutsideClick)
        } else {
            document.removeEventListener('mousedown', handleOutsideClick)
        }
        const handleEscapeKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                console.log('Esc key pressed'); 
                onClose()
            }
        }
        if (isOpen) {
            document.addEventListener('keydown', handleEscapeKey);
          } else {
            document.removeEventListener('keydown', handleEscapeKey);
          }

          return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
            document.removeEventListener('keydown', handleEscapeKey)
          }
    }, [isOpen, onClose])
    const handleTypeSelection = (type: string) => {
        setSelectedType(type);
    };

    const handleRoomSelection = (room: string) => {
        if (selectedRooms.includes(room)) {
            setSelectedRooms(selectedRooms.filter((selected) => selected !== room));
        } else {
            setSelectedRooms([...selectedRooms, room]);
        }
    };

    const handleAmenitySelection = (amenity: string) => {
        if (selectedAmenities.includes(amenity)) {
            setSelectedAmenities(selectedAmenities.filter((selected) => selected !== amenity));
        } else {
            setSelectedAmenities([...selectedAmenities, amenity]);
        }
    };

const clearFilters = () => {
    setSelectedType('');
    setMinPrice('');
    setMaxPrice('');
    setSelectedRooms([]);
    setSelectedAmenities([]);
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
                    <h3>Boendetyp</h3>
                        <p>Sök efter rum, hela boenden eller andra typer av boenden.</p>
                </div>
                    <div className="btnwrapper">
                        <button className={`${selectedType === 'Lägenhet' ? 'selected' : ''} choicebtn`} onClick={() => handleTypeSelection('Lägenhet')}>Lägenhet</button>
                        <button className={`${selectedType === 'Hus' ? 'selected' : ''} choicebtn`} onClick={() => handleTypeSelection('Hus')}>Hus</button>
                        <button className={`${selectedType === 'Korridor' ? 'selected' : ''} choicebtn`} onClick={() => handleTypeSelection('Korridor')}>Korridor</button>
                        <button className={`${selectedType === 'Rum' ? 'selected' : ''} choicebtn`} onClick={() => handleTypeSelection('Rum')}>Rum</button>
                    </div>
        </div>
            <div className="filter-section">
                <div className="textwrapper">
                    <h3>Prisintervall</h3>
                        <p>Månadshyra</p>
                </div>
                <div className="inputwrapper">
                    <div className="input-container">
                            <input
                                className='inputnum'
                                type="number"
                                placeholder="Kr 3000"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)} />
                            <label htmlFor="minPrice">Lägst</label>
                        </div>
                        <div className='string'></div>
                        <div className="input-container">
                            <input
                                className='inputnum'
                                type="number"
                                placeholder="Kr 7000"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)} />
                            <label htmlFor="maxPrice">Högst</label>
                        </div>
                    </div>
                </div>
                <div className="filter-section">
                    <div className="textwrapper">
                        <h3>Antal rum</h3>
                        <p>Sovrum</p>
                        <div className="room-buttons">
                            <button onClick={() => handleRoomSelection('allaSovrum')}>alla</button>
                            {[...Array(10).keys()].map((roomNumber) => (
                                <button key={roomNumber} onClick={() => handleRoomSelection(`sovrum-${roomNumber + 1}`)}>
                                    {roomNumber + 1}
                                </button>
                            ))}
                        </div>
                        <p>Badrum</p>
                        <div className="room-buttons">
                            <button onClick={() => handleRoomSelection('allaBadrum')}>alla</button>
                            {[...Array(10).keys()].map((roomNumber) => (
                                <button key={roomNumber} onClick={() => handleRoomSelection(`badrum-${roomNumber + 1}`)}>
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
                            <input type="checkbox" name="wifi" id="" />
                            <label htmlFor="wifi">Wifi</label>
                        </div>
                        <div className="check">
                            <input type="checkbox" name="kitchen" id="" />
                            <label htmlFor="kitchen">Kök</label>
                        </div>
                        <div className="check">
                            <input type="checkbox" name="washer" id="" />
                            <label htmlFor="washer">Tvättstuga/tvättmaskin</label>
                        </div>
                        <div className="check">
                            <input type="checkbox" name="tv" id="" />
                            <label htmlFor="tv">Tv</label>
                        </div>
                        <div className="check">
                            <input type="checkbox" name="workarea" id="" />
                            <label htmlFor="workarea">Dedikerad arbetsyta</label>
                        </div>
                        <div className="check">
                            <input type="checkbox" name="parkering" id="" />
                            <label htmlFor="parkering">Parkering</label>
                        </div>
                        <div className="check">
                            <input type="checkbox" name="balcony" id="" />
                            <label htmlFor="balcony">Balkong</label>
                        </div>
                        <div className="check">
                            <input type="checkbox" name="elevator" id="" />
                            <label htmlFor="elevator">Hiss</label>
                        </div>
                    </div>
                </div>

                <div className="filter-section">
                    <div className="endwrapper">
                        <button onClick={clearFilters} className='black-underline'>Rensa filter</button>
                        <button className='showbtn'>Visa boende</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterModal;
