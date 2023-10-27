import '../css/components/Navbar.css';
import HamburgerMenu from './HamburgerMenu';
import { Link } from 'react-router-dom'; 
import React, { useState, useEffect, useRef } from 'react';
import FontAw from '../components/icons/FontAw'; 

const logo = '../resource/studystay-logo 2.jpg';

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
    <nav className="navbar">
      <div>
        <Link to={'/'}>
          <img src={logo} alt="" />
        </Link>
      </div>
      <div className="navlink">
      </div>
      <div className={`navHB ${isDropdownOpen ? 'open' : ''}`} ref={navHBRef}>
        <button className="hamburger-button" onClick={toggleDropdown}>
          <HamburgerMenu />
        </button>
        <button className="profile-button">
          <Link to={token ? '/profil' : '/login'}>
            <FontAw iconName="user" />
          </Link>
        </button>
        {isDropdownOpen && (
          <div className="dropdown-menu" ref={dropdownRef}>
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
  );
};

export default Navbar;