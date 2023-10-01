import '../css/components/Navbar.css';
import HamburgerMenu from './HamburgerMenu'; 
import HouseIcon from '../components/icons/HouseIcon'

const logo = '../resource/studystay-logo 2.jpg';

const profileIconBackground = (
    <svg xmlns="http://www.w3.org/2000/svg" width="41" height="40" viewBox="0 0 41 40" fill="black">
      {/* <circle cx="20.5" cy="20" r="19" fill="black" /> */}
      <path fill="#D9863B" d="M20.5 6.66666C12.9521 6.66666 6.83334 12.6362 6.83334 20C6.83334 23.4985 8.21378 26.6831 10.4755 29.0629C10.5609 28.7873 10.6745 28.5165 10.8226 28.2581C11.3248 27.382 11.9584 26.5719 12.7102 25.8556C13.4646 25.1367 14.3157 24.5334 15.2338 24.0568C13.8356 22.751 12.9614 20.9261 12.9614 18.8889C12.9614 14.8633 16.3747 11.6667 20.5 11.6667C24.6253 11.6667 28.0386 14.8633 28.0386 18.8889C28.0386 20.9261 27.1644 22.751 25.7662 24.0568C26.6843 24.5334 27.5354 25.1367 28.2899 25.8556C29.0416 26.5719 29.6752 27.382 30.1774 28.2581C30.3256 28.5165 30.4391 28.7873 30.5245 29.0629C32.7862 26.6831 34.1667 23.4985 34.1667 20C34.1667 12.6362 28.0479 6.66666 20.5 6.66666Z" />
    </svg>
  );
  
  const Navbar = () => {
    return (
      <nav className='navbar'>
        <div>
          <img src={logo} alt="" />
        </div>
        <div className="navlink">
          <a href="#" className="plain-link">Om oss</a>
          <a href="#" className="plain-link">
            <span className="icon-text">
                <HouseIcon />
              Hyr ut
            </span>
          </a>
        </div>
        <div className="navHB">
          <HamburgerMenu /> 
          <button className="profile-button">
            <div className='blackcover'>
            {profileIconBackground} 
            </div>
          </button>
        </div>
      </nav>
    );
  }
  
  export default Navbar;