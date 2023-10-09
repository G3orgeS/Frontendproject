import { useState } from 'react';
import '../css/components/LoginForm.css'

const LoginForm = () => {
    const [error, setError] = useState<string | null>(null); // Ändra typen till string | null
    const studystayimg = '../resource/studystay-logo 2.jpg';
  
    const handleSubmit = () => {
      setError('*Någonting blev fel'); 
  
    };
  return (
    <div className="formwrapper">
        <div className="infosection1">
            <h1>Mina sidor</h1>
            <p>Här loggar du in på Mina Sidor om du är hyresgäst hos oss eller om du står i vår bostadskö.</p>
            <img src={studystayimg} alt="studystay loga" />
            <p>Vänligen fyll i fälten nedan</p>
        </div>
    <div className="inputsection1">
        <div className="input">
    <input type="email" placeholder="E-MAIL" />
    <div className="pass">
    <input type="password" placeholder="LÖSENORD" />
    <a id="pp" href="#">
              Glömt lösenord?
            </a>
    </div>
    </div>
    </div>
    {error && <p className="error">{error}</p>}
    <button className="showbtn" onClick={handleSubmit}>Logga in</button>
    </div>
  )
}

export default LoginForm