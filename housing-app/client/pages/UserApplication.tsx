import { useEffect, useState } from "react";
import { fetchUserByToken } from "../data/userApi";
import { Users } from "../types/user";
import { getApplicationByUser } from "../data/applicationApi"; // Importera funktionen
import { Application } from "../types/application";

const UserApplication = () => {
  const [userInfo, setUserInfo] = useState<Users | null>(null);
  const [userApplications, setUserApplications] = useState<Application[] | null>(null); // State för ansökningar

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      fetchUserByToken(token)
        .then((data) => {
          if (data) {
            setUserInfo(data);
            // Hämta ansökningar när användarinformation är tillgänglig
            // console.log("Användarens username:", data.userName);
            getApplicationsForUser(data.userName);
          } else {
            console.error('Något gick fel vid hämtning av användarinformation.');
          }
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }, []);

  const getApplicationsForUser = (username: string) => {
    // console.log("Användarens username som skickas till API:", username); // Lägg till denna rad
    getApplicationByUser(username)
      .then((applications) => {
        if (applications) {
          console.log("Hämtade ansökningar:", applications);
          setUserApplications(applications);
        } else {
          console.error('Något gick fel vid hämtning av ansökningar.');
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };
  

  return (
    <div>
      <h1>här visas alla bostäder som användaren har ansökt till:</h1>

    </div>
  );
}

export default UserApplication;
