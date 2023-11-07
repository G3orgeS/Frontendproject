import { useState } from 'react';
import '../../css/components/form/LoginForm.css';
import { loginUser } from '../../data/userApi';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [passwordHash, setPasswordHash] = useState('');
  const [error, setError] = useState<string>(''); 
  const studystayimg = '../resource/studystay-logo2.jpg';
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userName || !passwordHash) {
      setError('Vänligen fyll i både användarnamn och lösenord.');
      return; 
    }

    try {
      const token = await loginUser(userName, passwordHash);
      if (token) {
        console.log('Inloggning framgångsrik, token sparas i localStorage');
        navigate('/profil');
      }
    } catch (error) {
      setError('Fel användarnamn eller lösenord. Försök igen.');
    }
  };

  return (
    <div className="formwrapper">
      <div className="logininfosection1">
        <h1>Mina sidor</h1>
        <p>
          Här loggar du in på Mina Sidor om du är hyresgäst hos oss eller om du står i vår bostadskö.
        </p>
        <img src={studystayimg} alt="studystay logo" />
        <p>Vänligen fyll i fälten nedan</p>
      </div>
      <div className="logininputsection1">
        <div className="input">
          <input
            type="email"
            placeholder="JohnDoe"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <div className="pass">
            <input
              type="password"
              placeholder="********"
              value={passwordHash}
              onChange={(e) => setPasswordHash(e.target.value)}
            />
            <a id="pp" href="#">
              Glömt lösenord?
            </a>
          </div>
        </div>
      </div>
      {error && <p className="error-message">*{error}</p>}
      <button className="registerbtn" onClick={handleLogin}>
        Logga in
      </button>
      <div className="loginLink">
        <h4>Vill du registrera ett konto?</h4>
        <p>
          <a href="/register">Klicka här</a> för att registrera ett konto
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
