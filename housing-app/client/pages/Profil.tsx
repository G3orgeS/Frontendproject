// import React, { useEffect, useState } from 'react';
// import { Users } from '../types/user';
// import { fetchUserById } from '../api/userApi'; // Importera fetchUserById-funktionen

// const Profil: React.FC<{ userId: string }> = ({ userId }) => {
//   const [userInfo, setUserInfo] = useState<Users | null>(null);

//   useEffect(() => {
//     // Anropa API-funktionen för att hämta användarinformation baserat på ID
//     fetchUserById(userId)
//       .then((data) => {
//         if (data) {
//           setUserInfo(data);
//         } else {
//           console.error('Något gick fel vid hämtning av användarinformation.');
//         }
//       })
//       .catch((error) => {
//         console.error(error.message);
//       });
//   }, [userId]);

//   return (
//     <div>
//       <h1>Profil</h1>
//       {userInfo && (
//         <div>
//           <p>Användarnamn: {userInfo.username}</p>
//           <p>Förnamn: {userInfo.firstname}</p>
//           <p>Efternamn: {userInfo.lastname}</p>
//           <p>E-post: {userInfo.email}</p>
//           {/* Visa andra användarattribut här */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profil;
