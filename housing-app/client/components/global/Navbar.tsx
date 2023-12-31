import '../../css/components/global/Navbar.css';
import { Link } from 'react-router-dom'; 
import React, { useState, useEffect, useRef } from 'react';
import Icon from '../icons/Icon';
import logo from '../../resource/studystay-logo2.jpg'

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navHBRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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

  const token = localStorage.getItem('token');
  const profileLink = token ? '/profil' : '/login';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    window.location.href = '/';
  };

  return (
    <div className="navbarwrapper">
    <nav className="navbar">
      <div className='navImg'>
        <Link to={'/'}>
          <img src={logo} alt="" />
        </Link>
      </div>
      <div className="navlink">
      </div>
      <div className={`navHB ${isDropdownOpen ? 'open' : ''}`} ref={navHBRef}>
        <button className="hamburger-button" onClick={toggleDropdown}>
        <Icon className='HB' showText={false} include="HB" />
        </button>
        <div className="profile-icon">
          <Link  id='navbaricon' to={token ? '/profil' : '/login'}>
          <Icon showText={false} include="Profil" />
          </Link>
        </div>
        {isDropdownOpen && (
          <div className="dropdown-menu" ref={dropdownRef}>
    <span className="close-icon" onClick={toggleDropdown}>
    &times;
    </span>
            <Link to={token ? '/profil' : '/login'} className="dropdownLink">
              Min profil
            </Link>
            <Link to="/" className="dropdownLink">
              Bostäder
            </Link>
            <Link to="/contact" className="dropdownLink">
              Kontakt
            </Link>
            <Link to="/about" className="dropdownLink">
              Villkor
            </Link>
            <Link to="/rent" className="dropdownLink">
              Hyr ut
            </Link>
            <button className="dropbtn" onClick={handleLogout}>
              LOGGA UT
            </button>
          </div>
        )}
      </div>
    </nav>
    </div>
  );
};

export default Navbar;