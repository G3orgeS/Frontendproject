import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getApplicationByUser } from "../data/applicationApi";
import { Application } from "../types/application";
import { HouseSelection } from '../types/application'

const UserApplication = () => {
  const { username } = useParams<{ username: string }>();
  const [userApplications, setUserApplications] = useState<Application[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (username) {
          const applications = await getApplicationByUser(username);
          setUserApplications(applications);
        }
      } catch (error) {
        console.error("Ett fel uppstod: ", error);
      }
    };
    fetchData();
  }, [username]);

if (userApplications && userApplications.length > 0) {
  const userhouse = userApplications[0];
  console.log(userhouse)
  return (
    <div>
      <h2>Användarens Hus</h2>
    </div>
  );
} else {
  // Om det inte finns några användaransökningar
  return (
    <div>
      <p>Inga ansökningar hittades för användaren.</p>
    </div>
  );
}
};

export default UserApplication;
