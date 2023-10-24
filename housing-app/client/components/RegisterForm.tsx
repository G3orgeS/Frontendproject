import {useState} from 'react'
import '../css/components/RegisterForm.css'

const RegisterForm = () => {
    const [error, setError] = useState<string | null>(null);
    const studystayimg = '../resource/studystay-logo 2.jpg';
  
    const handleSubmit = () => {
        setError('*Någonting blev fel'); 
    
      };
  return (
<div className="regformwrapper">
      <div className="infosection1 rightwrap">
        <h1>Bostadskö för våra hyresrätter</h1>
        <span >
        Välkommen till StudyStays bostadskö för lediga studentbostäder. Vår kö är kostnadsfri och du kan ställa dig i kön när du har fyllt 16 år och söka en bostad när du fyllt 18 år.
        </span>
        <br />
        <h2>Registrera dig kotnadsfritt</h2>
      </div>
        <img src={studystayimg} alt="studystay logo" />
      <div className="reg-inputsection">
    <div className="reg-input">
      <input type="text" placeholder="FÖRNAMN" />
      <input type="text" placeholder="EFTERNAMN" />
      <input type="email" placeholder="E-MAIL" />
    </div>
    <div className="reg-input">
      <input type="password" placeholder="LÖSENORD" />
      <input type="password" placeholder="VERIFIERA LÖSENORD" />
      <div className="checkboxen">
      <input type="checkbox" id="termsCheckbox" />
      <label htmlFor="termsCheckbox">Jag godkänner villkoren</label>
      </div>
    </div>
  </div>
  {error && <p className="error">{error}</p>}
  <button className="showbtn" onClick={handleSubmit}>
    SUBMIT
  </button>
      <div className="loginLink rightwrap">
        <h2>Står du redan i vår kö?</h2>
        <p><a href="/login">Klicka här</a> för att logga in på ditt konto</p>
      </div>
    </div>
  )
}

export default RegisterForm