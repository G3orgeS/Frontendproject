
export async function loginUser(userName: string, passwordHash: string) {
  try {
    const response = await fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName, passwordHash }),
    });

    if (response.status === 200) {
      const data = await response.json();
      const token = data.token;

      localStorage.setItem('token', token);

      // const userInfo = await fetchUserInfo(token);
      return token; // Returnera token direkt efter att det har sparats
    } else {
      console.error('Inloggning misslyckades');
      return null;
    }
  } catch (error) {
    console.error('Något gick fel:', error);
    return null;
  }
}

// export async function fetchUserById(userId: string) {
//   try {
//     const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
//       method: 'GET',
//     });

//     if (response.status === 200) {
//       const userInfo = await response.json();
//       return userInfo;
//     } else {
//       console.error('Kunde inte hämta användarinformation');
//       return null;
//     }
//   } catch (error) {
//     console.error('Något gick fel vid hämtning av användarinformation:', error);
//     return null;
//   }
// }