import React, { useEffect, useState } from 'react';
import { Users } from '../types/user';
import { fetchUserByToken } from '../data/userApi';
import '../css/pages/profil.css';
import ImgWrapper from '../components/global/ImgWrapper';
import Icon from '../components/icons/Icon';
import Button from '../components/global/Button';

const profilimg = '../resource/profil.jpg';

const Profil: React.FC = () => {
  const [userInfo, setUserInfo] = useState<Users | null>(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    window.location.href = '/';
  };
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      fetchUserByToken(token)
        .then((data) => {
          if (data) {
            setUserInfo(data);
          } else {
            console.error('Något gick fel vid hämtning av användarinformation.');
          }
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }, []);

  return (
    <>
    <ImgWrapper src={profilimg} alt={'profilwrapperbild'} />
    <div className="profil-container">
      <h1>Profil</h1>
      {userInfo && (
        <div className="profil-info">
          <div className="profil-icon">
          <Icon include={'Profil'} showText={null} />
          </div>
          <p>Förnamn: {userInfo.firstName}</p>
          <p>Efternamn: {userInfo.lastName}</p>
          <p>E-post: {userInfo.email}</p>
          <p>Användarnamn: {userInfo.userName}</p>
          <Button onClick={handleLogout}>Logga ut</Button>
        </div>
      )}
    </div>
    </>
  );
};

export default Profil;