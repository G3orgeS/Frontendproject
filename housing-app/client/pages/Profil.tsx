import React, { useEffect, useState } from 'react';
import { Users } from '../types/user';
import { fetchUserByToken } from '../data/userApi';

const Profil: React.FC = () => {
  const [userInfo, setUserInfo] = useState<Users | null>(null);

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
    <div>
      <h1>Profil</h1>
      {userInfo && (
        <div>
          <p>Förnamn: {userInfo.firstName}</p>
          <p>Efternamn: {userInfo.lastName}</p>
          <p>E-post: {userInfo.email}</p>
          <p>Användarnamn: {userInfo.userName}</p>
        </div>
      )}
    </div>
  );
};

export default Profil;