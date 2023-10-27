import { useState } from 'react';
import '../css/components/LoginForm.css';
import { loginUser } from '../data/userApi';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [passwordHash, setPasswordHash] = useState('');
  const studystayimg = '../resource/studystay-logo 2.jpg';
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('handleLogin anropas.');

    const token = await loginUser(userName, passwordHash); 

    if (token) {
      console.log('Inloggning framgångsrik, token sparas i localStorage')
      // använd React Router för att navigera.
      navigate('/profil');
    }
  };

  return (
    <div className="formwrapper">
      <div className="infosection1">
        <h1>Mina sidor</h1>
        <p>
          Här loggar du in på Mina Sidor om du är hyresgäst hos oss eller om du står i vår bostadskö.
        </p>
        <img src={studystayimg} alt="studystay logo" />
        <p>Vänligen fyll i fälten nedan</p>
      </div>
      <div className="inputsection1">
        <div className="input">
          <input
            type="email"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <div className="pass">
            <input
              type="password"
              placeholder="Lösenord"
              value={passwordHash}
              onChange={(e) => setPasswordHash(e.target.value)}
            />
            <a id="pp" href="#">
              Glömt lösenord?
            </a>
          </div>
        </div>
      </div>
      <button className="showbtn" onClick={handleLogin}>
        Logga in
      </button>
      <div className="loginLink">
        <h2>Inte medlem ännu?</h2>
        <p><a href="/register">Klicka här</a> för att registrera ett konto</p>
      </div>
    </div>
  );
};

export default LoginForm;
