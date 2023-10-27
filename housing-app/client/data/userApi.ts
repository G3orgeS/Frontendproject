export async function loginUser(userName: string, password: string) {
  try {
    const response = await fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName, password }),
    });

    if (response.status === 200) {
      const data = await response.json();
      const token = data.token;

      const expirationDate = new Date().getTime() + 3600 * 1000; // 1 hour
      localStorage.setItem('token', token);
      localStorage.setItem('tokenExpiration', expirationDate.toString());

      setTimeout(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
        console.log('Token har löpt ut och tagits bort från local storage.');
      }, 3600 * 1000); 

      return token;
    } else {
      console.error('Inloggning misslyckades');
      return null;
    }
  } catch (error) {
    console.error('Något gick fel:', error);
    return null;
  }
}

export async function fetchUserByToken(token: string) {
  try {
    // Hämta utgångsdatum från local storage
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    const expirationDate = tokenExpiration ? parseInt(tokenExpiration) : 0;

    if (expirationDate < new Date().getTime()) {
      // Token har löpt ut, ta bort token och utgångsdatum från local storage
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');
      console.error('JWT-token har löpt ut');
      return null;
    }

    const response = await fetch('http://localhost:3000/api/users/fetchToken', {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    });

    if (response.status === 200) {
      const userInfo = await response.json();
      return userInfo;
    } else {
      console.error('Kunde inte hämta användarinformation');
      return null;
    }
  } catch (error) {
    console.error('Något gick fel vid hämtning av användarinformation:', error);
    return null;
  }
}

export async function registerUser(firstName: string, lastName: string, email: string, userName: string, password: string) {
  try {
    const response = await fetch('http://localhost:3000/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, email, userName, password }),
    });

    if (response.status === 201) {
      console.log('Användaren har registrerats');
      return true;
    } else if (response.status === 400) {
      const data = await response.json();
      console.error(data.message);
      return false;
    } else {
      console.error('Någonting blev fel');
      return false;
    }
  } catch (error) {
    console.error('Något gick fel:', error);
    return false;
  }
}