import '../css/components/Navbar.css';
import HamburgerMenu from './HamburgerMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
// import HouseIcon from '../components/icons/HouseIcon'
import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';

const logo = '../resource/studystay-logo 2.jpg';

const profileIconBackground = (
  <svg xmlns="http://www.w3.org/2000/svg" width="41" height="40" viewBox="0 0 41 40" fill="black">
    <path fill="#D9863B" d="M20.5 6.66666C12.9521 6.66666 6.83334 12.6362 6.83334 20C6.83334 23.4985 8.21378 26.6831 10.4755 29.0629C10.5609 28.7873 10.6745 28.5165 10.8226 28.2581C11.3248 27.382 11.9584 26.5719 12.7102 25.8556C13.4646 25.1367 14.3157 24.5334 15.2338 24.0568C13.8356 22.751 12.9614 20.9261 12.9614 18.8889C12.9614 14.8633 16.3747 11.6667 20.5 11.6667C24.6253 11.6667 28.0386 14.8633 28.0386 18.8889C28.0386 20.9261 27.1644 22.751 25.7662 24.0568C26.6843 24.5334 27.5354 25.1367 28.2899 25.8556C29.0416 26.5719 29.6752 27.382 30.1774 28.2581C30.3256 28.5165 30.4391 28.7873 30.5245 29.0629C32.7862 26.6831 34.1667 23.4985 34.1667 20C34.1667 12.6362 28.0479 6.66666 20.5 6.66666Z" />
  </svg>
);

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navHBRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navHBRef.current &&
        !navHBRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className='navbar'>
      <div>
        <Link to={'/'}>
          <img src={logo} alt="" />
        </Link>
      </div>
      <div className="navlink">
        <Link to={'/about'}>Om oss</Link>
        <Link to="/" className="plain-link">
          {/* Ska ändra Link så att jag kommer till en annan plats */}
          <span className="icon-text">
          <FontAwesomeIcon icon={faHouse} />
            Hyr ut
          </span>
        </Link>
      </div>
      <div className={`navHB ${isDropdownOpen ? 'open' : ''}`} ref={navHBRef}>
        <button className="hamburger-button" onClick={toggleDropdown}>
          <HamburgerMenu />
        </button>
        <button className="profile-button"><Link to='/profil'>
          <div className='blackcover'>
            {profileIconBackground}
          </div>
          </Link>
        </button>
        {isDropdownOpen && (
          <div className="dropdown-menu" ref={dropdownRef}>
            <Link to="/profil" className='dropdownLink'>Min profil</Link>
            <Link to="/houselist" className='dropdownLink'>Bostäder</Link>
            <Link to="/register" className='dropdownLink'>Ansökningar</Link>
            <Link to='/contact' className='dropdownLink'>Kontakt</Link>
            <Link to='/info' className='dropdownLink'>Villkor</Link>
            <Link to='/rent' className='dropdownLink'>Hyr ut</Link>
            <button className='dropbtn'>LOGGA UT</button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;