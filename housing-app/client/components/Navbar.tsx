import '../css/components/Navbar.css';
import HamburgerMenu from './HamburgerMenu';
import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import FontAw from '../components/icons/FontAw'; // Uppdaterad import

const logo = '../resource/studystay-logo 2.jpg';

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
        {/* Här var det en onödig </Link> som togs bort */}
      </div>
      <div className={`navHB ${isDropdownOpen ? 'open' : ''}`} ref={navHBRef}>
        <button className="hamburger-button" onClick={toggleDropdown}>
          <HamburgerMenu />
        </button>
        <button className="profile-button">
          <Link to='/login'>
          <FontAw iconName="user" />
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
